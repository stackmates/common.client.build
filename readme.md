
# Client

Share frontend development assets so projects can be built and iterated on faster.


## Get Started

# Client

```
  git clone https://github.com/stackmates/stackmates
  cd stackmates/client      
  npm  i                // make and drink coffee then come back (takes around 25mins)
  bower i               // choose first option
```

## Setup directories

```
  mdir content      
  mdir src/projects      
```

## Clone starter project

```
  cd src/projects     
  git clone https://github.com/stackmates/it-starts-upfront [your-domain]     
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
 src/projects/[your-domain]/siteHome/config/gulp.js
```


#### Markdown Files

* Set **contentDir** path to directory with markdown index.md file by default this is a markdown directory in your project.


##### Google Drive

It is not essential to use google drive but templates do use a google spreadsheet for some config information.


Part of the **Dreamineering + StackMates** philosophy is to not adopt software solutions until you really know your use case. Most small projects **don't need project management software** as you have all you need to communicate goals and track important information in google drive.

If you work with non technical users they can create content with [stackedit.io](https://stackedit.io) which integrates with [google+](https://plus.google.com/) to upload images, which gives provides a nice opportunity to streamline your workflow. That is the theory at least, unfortunately stackedit.io is too sluggish for me.


This [project  starter directory](https://drive.google.com/drive/u/0/?rfd=1#folders/0B_isMPC-_gvmdXU0YWd0UmdSLTQ/0B_isMPC-_gvmbkZhcWdaR2trVms/0B_isMPC-_gvmUXJoX0toXzdpRmc) has been setup with template files help drive and communicate how your project evolves from the creative process though to providing current status reports using various free tools and the *lingua franca* of business **spreadsheets**. The benefit here is that no-one needs to learn a new tool to understand how the project is evolving. 

> The intent is tightly integrate a basic CMS solution as much as possible with standard business operations to provide greater process efficiencies for small businesses.

If you want to use this directory email me and I'll copy the content into a project folder that you share with me with no obligation and you immediately stop sharing. But any feedback on what works or doesn't to improve the setup would be appreciated. My aim is to automate the process of copying this directory.


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
  src/projects/[your-domain]/appLob/config/gulp.js  
```

### Mobile App       

Edit project mobile config files in ...

```
 src/projects/[your-domain]/appIonic/config/gulp.js  
```



## Stylesheets
      

### Website    
Edit src/projects/[your-domain]/siteHome/style/main.css   



```
  import "./src/projects/[your-domain]/_shared/style";  
```

### LoB App  
Edit src/projects/[your-domain]/appLob/style/main.css     

```
  import "./src/projects/[your-domain]/_shared/style";  
```


## Sites
      
### Development

build
```      
gulp build -b [your-domain]SiteHome -t site     
```

live
```
gulp watch -b [your-domain]SiteHome -t site     
```      

**Note:** [I experience this issue ocassionally](https://github.com/joyent/node/issues/5463) just keep trying. If things are bad I find it can take three restarts other times it is sweet.


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

client/src/projects/[your-domain]/_shared/angular/services/content_service.js

```
  $http.get('assets/data/[your-domain].json')
```
      
### LoB App      

#### Development

Live
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



### Browserify

I think there must be a better way to use browserify? Or maybe a more gulp friendly package system?
Browserify gulp and livereload are not the best of the mates right now. 
May revert to browsersync. Will upgrade browserify when browserify-shim is ready and know issues with karma...

### Handlebars

* Need to find a way to reload handlebars partials during watch

## CSS

prefix rules

* d : domain specific rule

* u  : utility rules, should all exist in common
* t  : typography
* dt : typography rules in domain


To be decided, should all CSS be _shared for a single domain? Would that make it easier to find?

Depends on how much difference there should be between site and app style CSS?
