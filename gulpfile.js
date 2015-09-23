var gulp = require('gulp');

var sass = require('gulp-sass');
var react = require('gulp-react');

var path = {
	htmlSrc:'src/html/*.html',
	htmlDest: '.',
	htmlWatch:'src/html/*.html',
	styleSrc: 'src/style/main.scss',
	styleDest: 'build/css',
	styleWatch: 'src/style/**/*.scss',
	jsSrc: 'src/js/*.jsx',
	jsDest: 'build/js/',
	jsWatch: 'src/js/*.jsx'
};

gulp.task('html', function(){
	gulp.src(path.htmlSrc)
		.pipe(gulp.dest(path.htmlDest))
})

gulp.task('sass', function(){
	gulp.src(path.styleSrc)
		.pipe(sass({outputStyle: 'compressed'}))
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