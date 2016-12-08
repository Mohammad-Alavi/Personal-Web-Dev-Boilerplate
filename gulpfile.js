var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

// production development
env = process.env.NODE_ENV || 'development';

gutil.log('BUILD ENVIRONMENT: ' + env);

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}
// add all the .js files here
jsSources = [
    'components/scripts/name1.js',
    'components/scripts/name2.js'
];

sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html']

// all .js files will be concated to one file 'scripts.js'
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            //nested, expanded(normal), compact(in one line), compressed
            style: sassStyle
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('connect', function () {
    connect.server({
        root: outputDir,
        livereload: true
    })
})

gulp.task('html'), function () {
    gulp.src(htmlSources)
        .pipe(connect.reload())
}

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);