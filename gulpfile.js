const gulp = require('gulp');
const sass = require('gulp-sass');
const chalk = require('chalk');

function introduce (task, message) {

    console.log(`[${chalk.magenta(task)}] ${chalk.cyan(message)}`)

}

gulp.task('sass', () => {

    introduce('sass', 'Compiling Sass...');

    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));

})

gulp.task('watch', ['sass'], () => {

    introduce('watch', 'Watching files for changes...');

    gulp.watch('scss/**/*.scss', ['sass']);

})

gulp.task('dev', ['watch']);

gulp.task('build', ['sass']);
