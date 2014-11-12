upstream app_stackmates {
    server 127.0.0.1:4000;
    keepalive 64;
}

server {
  listen 80;
  listen [::]:80 ipv6only=on;
  index index.html;
  autoindex off;
  server_name localhost:8100;
  server_name_in_redirect on;
  port_in_redirect on;

  root /var/www/stackmates;

  location / {
     try_files $uri $uri/ =404;
  }

  location ~ /\. {
      access_log off;
      log_not_found off;
      deny all;
  }

  location ~ ~$ {
      access_log off;
      log_not_found off;
      deny all;
  }

  location = /robots.txt {
      access_log off;
      log_not_found off;
  }

  location = /favicon.ico {
      access_log off;
      log_not_found off;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|json)(\?ver=[0-9.]+)?$ {
      expires 5h;
  }


  # pass the request to the node.js server
  # with some correct headers for proxy-awareness
  location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://app_stackmates/;
      proxy_redirect off;

      # Handle Web Socket connections
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
  }


}
