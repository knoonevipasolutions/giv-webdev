var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clip = require('gulp-clip-empty-files');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('build', ['styles', 'design', 'javascript', 'favicons']);
gulp.task('clean', ['styles:clean', 'design:clean', 'javascript:clean', 'favicons:clean']);

gulp.task('styles', ['styles:build']);
gulp.task('styles:build', ['styles:clean'], function() {
	return gulp.src('./web/src/stylesheets/**/*.scss')
		.pipe(clip())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'ie >= 9'],
			cascade: false
		}))
		.pipe(gulp.dest('./web/build/stylesheets'));
});
gulp.task('styles:clean', function(callback) {
	del(['./web/build/stylesheets']).then(function(data) {
		callback();
	});
});

gulp.task('javascript', ['javascript:build']);
gulp.task('javascript:build', ['javascript:clean'], function() {
	return gulp.src('./web/src/javascript/**/*.js')
		.pipe(gulp.dest('./web/build/javascript'));
});
gulp.task('javascript:clean', function(callback) {
	del(['./web/build/javascript']).then(function(data) {
		callback();
	});
});

gulp.task('design', ['design:build']);
gulp.task('design:build', ['design:clean'], function() {
	return gulp.src('./web/src/design/**/*')
		.pipe(gulp.dest('./web/build/design'));
});
gulp.task('design:clean', function(callback) {
	del(['./web/build/design']).then(function(data) {
		callback();
	});
});

gulp.task('favicons', ['favicons:build']);
gulp.task('favicons:build', ['favicons:clean'], function() {
	return gulp.src('./web/src/favicons/**/*')
		.pipe(gulp.dest('./web/build/favicons'));
});
gulp.task('favicons:clean', function(callback) {
	del(['./web/build/favicons']).then(function(data) {
		callback();
	});
});