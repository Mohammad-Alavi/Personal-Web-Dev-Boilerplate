var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

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
jsSources = ['components/scripts/name1.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

// all .js files will be concated to one file 'scripts.js'
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: sassStyle
        })
        .on('error', gutil.log))
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('html', function () {
    gulp.src('builds/development/*.html')
        // https://github.com/kangax/html-minifier
        .pipe(gulpif(env === 'production', htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            removeComments: true
        })))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('images', function () {
    gulp.src('builds/development/images/**/*.*')
    .pipe(gulpif(env === 'production', imagemin()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
    .pipe(connect.reload())
});

gulp.task('connect', function () {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'images', 'watch']);