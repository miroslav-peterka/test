const gulp = require('gulp');
const metalsmith = require('metalsmith');
const metalsmithMarkdown = require('metalsmith-markdown');
const metalsmithNavigation = require('metalsmith-navigation');
const metalsmithCleanUrls = require('metalsmith-clean-urls');
const metalsmithLayouts = require('metalsmith-layouts');

gulp.task('default', function () {

  metalsmith('src')
    .source('.')
    .ignore(['_*','!*.md'])
    .destination('../dist')
    .clean(true)
    .use(metalsmithMarkdown())
    .use(metalsmithNavigation({
      nav:{
        sortBy: 'order',
        includeDirs: true,
        mergeMatchingFilesAndDirs:false,
        mergeIndexWithParentDir:true,
        breadcrumbProperty: 'breadcrumb_path',
      }
    }))
    .use(metalsmithLayouts({
      "engine": "handlebars",
      "default": "page.html",
      "directory": "_layouts",
      "partials": "_partials"
    }))    
    .build(function(err) {
      if (err) throw err;
    });


  return gulp.src('src');

});