var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
});

gulp.task('serveprod', function() {
  connect.server({
    root: 'https://dry-beyond-7204.herokuapp.com',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);
