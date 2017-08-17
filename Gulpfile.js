var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var reportError = function (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

var input = './src/**/*.scss';
var output = './public/css/';

gulp.task('sass', function() {
	return gulp
			.src(input)
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on('error', reportError)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(output))
			.pipe(notify("CSS updated !"));
});

gulp.task('copy-thirdparty', function() {
	let files = [
					'./bower_components/jquery/dist/jquery.min.js',
					'./bower_components/bootstrap/dist/css/bootstrap.min.css',
				];
			
	return gulp.src(files, {base: './bower_components'})
				.pipe(gulp.dest('./public/thirdparty/'));
});

gulp.task('watch', function() {
	return gulp
			.watch(input, ['sass'])
			.on('change', function(event) {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			});
});

gulp.task('prod', [], function () {
	return gulp
			.src(input)
			.pipe(sass({outputStyle: 'compressed' }))
			.pipe(autoprefixer(autoprefixerOptions))
			.pipe(gulp.dest(output));
});

gulp.task('serve', ['copy-thirdparty'], function() {
	browserSync.init({
        files: [output, 'public/js/*.js'],
        proxy: "http://localhost/react/demo05_author_quiz.html",
    });
});

gulp.task('local', ['watch', 'copy-thirdparty'], function(){

});

gulp.task('default', ['watch', 'serve'], function(){

});

