# require
gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
less        = require 'gulp-less'
jade        = require 'gulp-jade'
notify      = require 'gulp-notify'
livereload  = require 'gulp-livereload'
del         = require 'del'
gutil       = require 'gulp-util'
# task
gulp.task 'jade', ->
  gulp.src './src/**/*.jade'
    .pipe jade { pretty: true }
    .on   'error', gutil.log
    .pipe gulp.dest './build'
    .pipe notify { message: "jade complate" }
    .pipe livereload()
# task
gulp.task 'coffee', ->
  gulp.src './src/**/*.coffee'
    .pipe coffee { bare: true }
    .on   'error', gutil.log
    .pipe gulp.dest './build'
    .pipe notify { message: "coffee complate" }
    .pipe livereload()
gulp.task 'less', ->
  gulp.src './src/**/*.less'
    .pipe less()
    .on   'error', gutil.log
    .pipe gulp.dest './build'
    .pipe notify { message: "less complate" }
    .pipe livereload()
gulp.task 'other', ->
  gulp.src ['./src/**/*.html', './src/**/*.js', './src/manifest.json', './src/**/*.png', './src/**/*.jpg']
    .pipe gulp.dest './build'
    .pipe notify { message: "other complate" }
    .pipe livereload()
gulp.task 'clean', (cb)->
  del ['./build/'], cb
gulp.task 'default', ['clean'], ->
  gulp.start 'coffee', 'less', 'other', 'jade'
gulp.task 'watch', ->
  gulp.watch './src/**/*.coffee', ['coffee']
  gulp.watch './src/**/*.jade', ['jade']
  gulp.watch './src/**/*.less', ['less']
  gulp.watch ['./src/**/*.html', './src/**/*.js', './src/manifest.json', './src/**/*.png', './src/**/*.jpg'], ['other']
  livereload.listen()
