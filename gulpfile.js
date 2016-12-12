var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    cssimport = require("gulp-cssimport"),
    bootlint = require('gulp-bootlint');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

// production development
// you can set it throgh commant line(for windows):
// set NODE_ENV=production&&npm start
// example:
//      set NODE_ENV=development&&gulp
// use this to see environmet in command line:
// echo %NODE_ENV%
env = process.env.NODE_ENV || 'development';

gutil.log('BUILD ENVIRONMENT: ' + env);

if (env === 'development') {
    outputDir = 'builds/development/';
    //nested, expanded(normal), compact(in one line), compressed
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    //nested, expanded(normal), compact(in one line), compressed
    sassStyle = 'compressed';
}
// add all the .js files here
jsSources = ['components/scripts/jquery.js', 'components/scripts/bootstrap.js', 'components/scripts/google_analytics.js', 'components/scripts/flipclock.js', 'components/scripts/flipclock_script.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

// all .js files in scripts folder will be concated to one file 'script.js' in production/js folder
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload());
});

gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            font: outputDir + 'fonts',
            style: sassStyle
        })
            .on('error', gutil.log))
        .pipe(cssimport())
        .pipe(gulpif(env === 'production', cleanCSS({ compatibility: 'ie8' })))
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('builds/development/*.html')
        .pipe(bootlint({
            stoponerror: false,
            stoponwarning: false,
            disabledIds: ['W005'],
            loglevel: 'debug'
        }))
        // https://github.com/kangax/html-minifier
        .pipe(gulpif(env === 'production', htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            removeComments: true
        })))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src('builds/development/images/**/*.*')
        .pipe(gulpif(env === 'production', imagemin()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/**/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'images', 'watch']);