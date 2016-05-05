/* eslint-env node */

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      sourcemaps = require('gulp-sourcemaps'),
      rimraf = require('rimraf'),
      runSequence = require('run-sequence');

gulp.task('clean', function(callback) {
  rimraf('dist', callback);
});

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    ['sass', 'js'],
    callback
  );
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
});
