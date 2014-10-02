// IN THE DOGBOX AS WAS KILLING THE BROWSER

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['build']
    }
  });

  // Watch for new styles
  gulp.watch(cfg.common.styles, { maxListeners: 999999 }, ['styles', reload ]);

  // Watch src js files should be updated with watchify
  // gulp.watch(cfg.common.appScripts, ['scripts', reload]);
  // Watch test.spec.js files
  // gulp.watch('./build/assets/js/app.js', [reload]);
  // Watch templates
  gulp.watch(cfg.common.html, { maxListeners: 999999 }, ['scriptsAngular', reload]);
  // Watch images
  gulp.watch(cfg.common.images, { maxListeners: 999999 }, ['images', reload]);
  // Watch others assets, pretty fast so grouped
  gulp.watch(cfg.common.fonts, { maxListeners: 999999 }, ['assets', reload]);
  gulp.watch(cfg.common.meta, { maxListeners: 999999 }, ['assets', reload]);
  gulp.watch(cfg.common.icons, { maxListeners: 999999 }, ['assets', reload]);

  gulp.watch(cfg.uri[cfg.siteBuild].indexHtml, ['indexHtml', reload]);

  // Watch for new content
  gulp.watch(
    cfg.uri[cfg.siteBuild].contentDir + '/**/*',
    { maxListeners: 999999 },
    ['fetchContent', 'sheets', reload]
  );

  // Watch for new content
  gulp.watch([
      cfg.common.markdown,
      cfg.common.buildHelpers,
      cfg.common.buildTemplates
    ],
    [
      'metalsmith', reload
    ]
  );

});
