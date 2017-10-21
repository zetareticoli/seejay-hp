var gulp            = require('gulp'),
    config          = require('./config.json'),
    browserSync     = require('browser-sync').create(),
    clean           = require('gulp-clean'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    scss            = require('gulp-sass'),
    data            = require('gulp-data'),
    reload          = browserSync.reload;
var fs              = require('fs');

// Task: Clean build files
gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean({
      force: true
  }))
});

// Task: Scss files
gulp.task('scss', function () {
  return gulp.src(config.scss.files)
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(reload({stream: true}));
});

// Task: Handle images
gulp.task('images', function () {
  return gulp.src(config.images.files)
    .pipe(gulp.dest(
      config.images.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});

// Task: Handle fonts
gulp.task('fonts', function () {
  return gulp.src(config.fonts.files)
    .pipe(gulp.dest(
      config.fonts.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('lib', function(){
  return gulp.src(config.lib.files)
    .pipe(gulp.dest(
      config.lib.dest
    ));
});

// Task: Handle scripts
gulp.task('js', function () {
  return gulp.src(config.js.files)
    .pipe(gulp.dest(
      config.js.dest
    ))
    .pipe(browserSync.reload({stream:true}));
});

// Task: Handle template files
gulp.task('template', function(){
  return gulp.src(config.pages.files)
  .pipe(data(function() {
      return JSON.parse(fs.readFileSync('src/data/data.json'));
    }))
  .pipe(nunjucksRender({
    path: ['src']
  }))
  .pipe(gulp.dest(config.root))
  .pipe(reload({stream: true}));
});

// Task: Watch files
gulp.task('watch', function () {

  // Watch scss files
  gulp.watch(
    config.scss.files,
    ['scss']
  );

  // Watch images files
  gulp.watch(
    config.images.files,
    ['images']
  );

  // Watch fonts files
  gulp.watch(
    config.fonts.files,
    ['fonts']
  );

  // Watch js files
  gulp.watch(
    config.js.files,
    ['js']
  );

  // Watch pages template files
  gulp.watch(
    config.pages.files,
    ['template']
  );

  // Watch patterns files
  gulp.watch(
    config.partials.files,
    ['template']
  );

  // Watch data json
  gulp.watch(
    config.data.files,
    ['template']
  );

});

// Task: Browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: config.root,
      ui: {
        port: 8080
      },
      serveStaticOptions : {
        extensions: ['html']
      }
    }
  });
});

// Task: Start server
gulp.task('start', ['clean'], function() {
  gulp.start(
    'scss',
    'images',
    'fonts',
    'js',
    'lib',
    'template',
    'watch',
    'browser-sync'
  );
});
