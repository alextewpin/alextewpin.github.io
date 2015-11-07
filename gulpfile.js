var gulp = require('gulp');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var react = require('gulp-react');

var path = {
	htmlSrc:'source/html/*.html',
	htmlDest: '.',
	htmlWatch:'source/html/*.html',
	styleSrc: 'source/style/main.scss',
	styleDest: 'build/css',
	styleWatch: 'source/style/**/*.scss',
	jsSrc: 'source/script/*.jsx',
	jsDest: 'build/js/',
	jsWatch: 'source/script/*.jsx'
};

gulp.task('html', function(){
	gulp.src(path.htmlSrc)
		.pipe(gulp.dest(path.htmlDest))
})

gulp.task('sass', function(){
	var processors = [
		autoprefixer({browsers: ['last 2 version', '> 2%']})
	];
	gulp.src(path.styleSrc)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(postcss(processors))
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