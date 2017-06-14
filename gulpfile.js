var browserify = require('browserify'),
    connect    = require('gulp-connect'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    pug        = require('gulp-pug'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    streamify  = require('gulp-streamify'),
    uglify     = require('gulp-uglify'),
    open       = require('gulp-open'),
    os         = require('os');

//    find which browser to open for dev
var browser   = os.platform() === 'linux' ? 'google-chrome' : (
                os.platform() === 'darwin' ? "Google Chrome" : (
                os.platform() === 'win32' ? 'chrome' : 'firefox'));
//    set default env to development, unless otherwise stated
var env       = process.env.NODE_ENV || 'development';
//    set to any output location
var outputDir = 'builds/development';

////////////////////////////////////////////////////////////////////////////
//
//  TASKS
//    - 'pug'
//    - 'js'
//    - 'sass'
//    - 'connect'
//    - 'watch'
//    - 'open'
//    - 'default'
//
////////////////////////////////////////////////////////////////////////////
//     task: pug
//  *.pug in /src  ==>  *.html in outputDir
////////////////////////////////////////////////////////////////////////////

gulp.task('pug', function() {
    return gulp.src('src/templates/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload());
});

////////////////////////////////////////////////////////////////////////////
//     task: JS
//  index.js + deps in /src  ==>  index.js in outputDir
//   - Development (default):
//      - bundles with source maps
//   - Production ('gulp js --production'):
//      - minifies index.js
//      - disables source maps
////////////////////////////////////////////////////////////////////////////

gulp.task('js', function() {
    return browserify('src/js/index.js', { debug: env === 'development' })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gutil.env.production ? streamify(uglify()) : gutil.noop())
        .pipe(gulp.dest(outputDir + '/js'))
        .pipe(connect.reload());
});

////////////////////////////////////////////////////////////////////////////
//     task: SASS
//  *.scss files in /src  ==>  main.css in outputDir
//   - Development (default):
//      - bundles with source maps
//   - Production ('gulp sass --production'):
//      - minifies main.css
//      - disables source maps
////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
    var config = {};

    gutil.env.production ? config.outputStyle = "compressed" : config.sourceComments = "map";

    return gulp.src('src/sass/main.scss')
        .pipe(sass(config))
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(connect.reload());
});

////////////////////////////////////////////////////////////////////////////
//     task: CONNECT
//  create server on port:3000 with live reloading
////////////////////////////////////////////////////////////////////////////

gulp.task('connect', function() {
    connect.server({
        root: [outputDir],
        port: 3000,
        livereload: true
    });
});

////////////////////////////////////////////////////////////////////////////
//     task: WATCH
//  recompile if .pug, .js or .scss are updated
////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
    gulp.watch('src/templates/**/*.pug', ['pug']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

////////////////////////////////////////////////////////////////////////////
//     task: OPEN
//  opens localhost:3000 in previously designated browser
////////////////////////////////////////////////////////////////////////////

gulp.task('open', function() {
    var config = {
        uri: 'http://localhost:3000',
        app: browser
    };

    gulp.src(__filename)
        .pipe(open(config));
});

////////////////////////////////////////////////////////////////////////////
//     task: DEFAULT
//  runs all tasks
////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['js', 'pug', 'sass', 'connect', 'watch', 'open']);

