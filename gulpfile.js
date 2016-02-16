var gulp = require('gulp');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var react = require('gulp-react');

var path = {
  htmlSrc:'source/*.html',
  htmlDest: '.',
  htmlWatch:'source/*.html',
  styleSrc: 'source/main.scss',
  styleDest: 'build',
  styleWatch: 'source/*.scss',
  jsSrc: 'source/*.jsx',
  jsDest: 'build',
  jsWatch: 'source/*.jsx'
};

gulp.task('html', function(){
  gulp.src(path.htmlSrc)
    .pipe(gulp.dest(path.htmlDest))
})

gulp.task('sass', function(){
  gulp.src(path.styleSrc)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 version', '> 2%']})
    ]))
    .pipe(gulp.dest(path.styleDest))
})

gulp.task('js', function(){
  gulp.src(path.jsSrc)
    .pipe(react())
    .pipe(gulp.dest(path.jsDest))
})

gulp.watch(path.htmlWatch, ['html']);
gulp.watch(path.styleWatch, ['sass']);
gulp.watch(path.jsWatch, ['js']);

gulp.task('default', ['html', 'sass', 'js']);