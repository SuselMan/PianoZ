var gulp = require('gulp'),
rename = require('gulp-rename'),
sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
return sass('app/sass/main.scss')
.on('error', function (err) {
console.error('Error!', err.message);
})
.pipe(rename('style.css'))
.pipe(gulp.dest('app/css/'));
});

gulp.task('watch', function () {
gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', function () {
gulp.start('watch');
});