const gulp = require('gulp'),
      rimraf = require('rimraf'),
      runSequence = require('run-sequence'),
      pkg = require('./package.json');

const { sass, plumber, notify, sourcemaps, replace } = require('gulp-load-plugins')();

const copyList = [
  'icon/icon.png',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/material-design-icons/iconfont/**/*'
];

gulp.task('clean', (callback) => {
  rimraf('dist', callback);
});

gulp.task('manifest', () => {
  return gulp.src('manifest.json')
    .pipe(replace('{{version}}', pkg.version))
    .pipe(replace('{{description}}', pkg.description))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', () => {
  return gulp.src(copyList)
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', () => {
  return gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    ['manifest', 'copy', 'html', 'js', 'sass'],
    callback
  );
});

gulp.task('watch', () => {
  gulp.watch('manifest.json', ['manifest']);
  gulp.watch(copyList, ['copy']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});
