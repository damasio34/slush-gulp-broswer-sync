var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

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