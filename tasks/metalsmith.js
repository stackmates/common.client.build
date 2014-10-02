'use strict';

var fs = require('fs');
var _ = require('lodash');
var jf = require('jsonfile')

var gulp = require('gulp');

// builder files config
var cfg            = require('../config/gulp');
var jsonOutputFile = cfg.uri[cfg.siteBuild].dataOut + '/' + cfg.uri[cfg.siteBuild].baseURL + '.json';

var Handlebars = require('handlebars');
require(cfg.uri[cfg.siteBuild].handlebarsHelpers)(cfg, Handlebars);

// metalsmith
var Metalsmith              = require('metalsmith');
var markdown                = require('metalsmith-markdown');
var templates               = require('metalsmith-templates');
var permalinks              = require('metalsmith-permalinks');
var metadata                = require('metalsmith-metadata');
var excerpts                = require('metalsmith-excerpts');
var collections             = require('metalsmith-collections');
var readJSON                = require('metalsmith-json');
var paginate                = require('metalsmith-paginate');

gulp.task('metalsmith', function(cb) {

  var m = Metalsmith(__dirname);

  m.clean(false);

  m.source('../content');

  // m.use(metadata({ site: { name: 'Start Dreamineering'}}));
  // move this config into gulp so can be used per project
  m.use(collections(cfg.uri[cfg.siteBuild].metalsmithCollections));

  m.use(paginate({
    perPage: 10,
    path: "philosophy/problems/page"
  }));

  m.use(readJSON());

  m.use(excerpts());

  m.use(markdown({
    gfm: true,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  }));

  m.use(permalinks());

  m.use(outputJSON());

  m.use(templates(cfg.uri[cfg.siteBuild].metalsmithTemplates));

  // directory: '../templates'
  m.destination('../build');
  m.build(function(err, files) {
    if (err) return console.error(err);
    // console.log(files);
    cb();
  });

});



// TODO this needs to be smarter with
// options shape output or create multiples files
// such as home page which could be loaded  into top of page with
// peformance tool from Addy Osmani then allow other content to load up

function outputJSON (opts) {

    opts = _.extend({
        key: 'data'
    }, (opts || {}));

    return function(files, metalsmith, done) {
        var metadata    = metalsmith.metadata();
        var output = {};  // deepClone turned buffer into an object
        var clone = {};
        var collectionName = '';

        // console.log('collections', metadata.collections);

        _.each(metadata.collections, function (collection, key) {

          _.each(collection, function ( value, record) {

            // console.log(collection);
            clone = _.clone(value);

            // value.contents = value.contents.toString().replace(/(\r\n|\n|\r)/gm,"");
            clone.html = clone.contents.toString();

            // console.log(value.html);
            delete clone.next;
            delete clone.previous;
            delete clone.contents;

            if ( clone.collection !== collectionName ) {
              collectionName = clone.collection;
              output[collectionName] = [];
            }

            output[collectionName].push(clone);

          });

        });

        // output = JSON.stringify(output);

        jf.writeFile(jsonOutputFile, output, function(err) {
          if (err) console.log(err);
          done();
        })


    };
};



// function tree() {
//   return function tree(files, metalsmith, done){
//     for (var file in files) {
//       (function () {
//         var path = file.split('/');
//         var siblings = [];
//         path.pop();

//         for (var possibleSibling in files) {
//           var possibleSiblingPath = possibleSibling.split('/');
//           possibleSiblingPath.pop();

//           if ((file !== possibleSibling) && _.isEqual(path, possibleSiblingPath)) {
//             siblings.push(files[possibleSibling]);
//           }
//         }

//         return files[file].siblings = siblings;
//       })(file, files);
//     }
//     done();
//   }
// }
