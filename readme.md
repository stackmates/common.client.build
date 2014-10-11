
# Client

Share frontend development assets so projects can be built and iterated on faster.


## Get Started

# Client

```
  git clone https://github.com/stackmates/common.client.build client
  cd client      
  npm  i                // make and drink coffee then come back (takes around 25mins)
  bower i               // choose first option
```

## Setup directories

```
  mdir content      
  mdir src/domain      
```

## Clone starter project

```
  cd src/domain     
  git clone https://github.com/stackmates/stackmates.client.project [your-domain]     
  cd [your-domain]      
```

## Git

```  
  create new repo     
```


## Configuration

      
config
```    
mv config/example.gulp.js config/gulp.js     
```

Edit gulp.js file and set project name      

  

### Website

Edit project site config files in 

```
 src/domain/[your-domain]/siteHome/config/gulp.js
```


#### Markdown Files

* Set **contentDir** path to directory with markdown index.md file by default this is a markdown directory in your project.


##### Google Drive

It is not essential to use google drive but templates do use a google spreadsheet for some [configuration information](https://docs.google.com/a/dreamineering.com/spreadsheets/d/1x0Fy072BB8hYg2d1j9xpOTG8AW1qHPQo6bENY-0Vx78/edit#gid=403638115) and you have the possibility to share markdown files with non technical users.


```
  contentDir    :   '/Users/your-path-to-google-drive-directory/',
```

**Note:** you will need to [install google drive](https://tools.google.com/dlpage/drive) first.


#### Sheets

Get id of spreadsheet and **REMEMBER** to publish sheet to the web

```
  File > Publish to the web...
```

* Edit config with your google sheets id eg 

```
  sheets    :   ['1x0Fy072BB8hYg2d1j9xpOTG8AW1qHPQo6bENY-0Vx78'],
```


### LoB App       

Edit project LOB config files for Line of business app in

```
  src/domain/[your-domain]/appLob/config/gulp.js  
```

### Mobile App       

Edit project mobile config files in ...

```
 src/domain/[your-domain]/appIonic/config/gulp.js  
```



## Stylesheets
      

### Website    
Edit src/domain/[your-domain]/siteHome/style/main.css   



```
  import "./src/domain/[your-domain]/_shared/style";  
```

### LoB App  
Edit src/domain/[your-domain]/appLob/style/main.css     

```
  import "./src/domain/[your-domain]/_shared/style";  
```


## Sites
      
### Development

build
```      
gulp build -b [your-domain]Site[Home | Landing] -t site     
```

live
browser sync (fast)
```
gulp serve -b [your-domain]Site[Home | Landing] -t site     
```

OR 
live reload (old school)
```
gulp watch -b [your-domain]Site[Home | Landing] -t site     
```



**Note:** 

* Using watch [I experience this issue](https://github.com/joyent/node/issues/5463) often it is annoying, but not annoying enough for me to validate looking into. Should be resolved with Node .12
* Serve works fine with static builds but I had problems with development with angular, hence two options


* This issue should be [resolved with release of v.12](https://www.bountysource.com/issues/337777-fs-watch-node-52551-carboncore-framework-fseventstreamstart-register_with_server-error-f2d_register_rpc-null-21)


### Deploy
```
gulp build -b [your-domain]SiteHome -t site -e production      
```

```      
cd ghpages/[your-domain]/home     
git init      
create github project     
add readme.md     
git add -A      
git commit -m 'initial commit'
git push to your repo      
git subtree push --prefix www origin gh-pages     
```      


To check out the production build locally 

```
 cd www
 python -m SimpleHTTPServer 9000 && open http://localhost:9000
```


## Apps

Update content json

client/src/domain/[your-domain]/_shared/angular/services/content_service.js

```
  $http.get('assets/data/[your-domain].json')
```
      
### LoB App      

#### Development

**NOTE** always run a build first when changing projects when working with brower sync otherwise you will get odd results.

```      
gulp build -b smAppLob -t app      
```


Live
```      
gulp serve -b smAppLob -t app      
```
OR
```      
gulp watch -b smAppLob -t app      
```

Test
```
gulp karma -b smAppLob -t app 
```

#### Deploy

```
gulp build -b smAppLob -t app -e production      
```

```
cd ghpages/[your-domain]/appLob                
git init, create project, and push      
git subtree push --prefix www origin gh-pages     
```      
      
### Mobile App

#### Development      
 
Build      
```      
gulp build -b smAppIonic -t app -c sass     
```

Live
```
gulp watch -b smAppIonic -t app -c sass     
```      

Testing not working at moment


#### Deploy

gulp build -b smAppIonic -t app -c sass -e production     

```
  cd ghpages/[your-domain]/mobile  
  git init, create project, and push etc     
  git subtree push --prefix www origin gh-pages     
```      
