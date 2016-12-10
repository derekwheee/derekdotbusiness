const gulp = require('gulp');
const sass = require('gulp-sass');
const chalk = require('chalk');
const spawn = require('child_process').spawn;

function introduce (task, message) {

    console.log(`[${chalk.magenta(task)}] ${chalk.cyan(message)}`)

}

gulp.task('sass', () => {

    introduce('sass', 'Compiling Sass...');

    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));

});

gulp.task('watch', ['sass'], () => {

    introduce('watch', 'Watching files for changes...');

    gulp.watch('scss/**/*.scss', ['sass']);

});

gulp.task('server', () => {

    introduce('server', 'Running local dev server...');

    const server = spawn('heroku', ['local']);

    server.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    server.stderr.on('data', (data) => {
        console.log(chalk.yellow(data.toString()));
    });

    server.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

});

gulp.task('dev', ['watch', 'server']);

gulp.task('build', ['sass']);
