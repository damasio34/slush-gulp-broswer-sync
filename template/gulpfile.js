var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var imagemin    = require('gulp-imagemin');
var uglify     	= require('gulp-uglify');
var concat 		= require('gulp-concat');
var del 		= require('del');

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*'
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('app/js/*js')
        .pipe(browserify())
        .pipe(uglify());
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});