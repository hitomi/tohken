var gulp         = require('gulp'),
    livereload   = require('gulp-livereload');

gulp.task('rld', function() {
  return gulp.src('./core/**/*')
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./core/**/*', ['rld']);
  livereload.listen();
});
