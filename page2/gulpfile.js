'use strict';

var postcss      = require('gulp-postcss');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var connect      = require('gulp-connect-php');
var browserSync  = require('browser-sync').create();
var handlebars   = require('handlebars');
var rename       = require('gulp-rename');
var gulpHandlebars = require('gulp-handlebars-html')(handlebars); //default to require('handlebars') if not provided

// Static Server + watching scss/html files

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        injectChanges: true,
        proxy: "http://localhost/davinchi/page2/page2.html"
    });

    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/hbs/**/*.hbs', ['handlebars']);

});

gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass({sourcemap: false, outputStyle: 'compressed', trace: false}).on('error', sass.logError ) )
    .pipe(postcss([ autoprefixer({ browsers: ['last 4 versions'] }) ]))
    .pipe(gulp.dest('./styles/'))
    .pipe(browserSync.stream());
});

gulp.task('handlebars', function () {
    var templateData = {
        courseName : 'Marca Personal (branding)',
        courseDesc : 'Acceder al mercado laboral'
    },
    options = {
        partialsDirectory : [
            '../commons/hbs/partials',
            './src/hbs/partials'
        ]
    }
    return gulp.src('src/hbs/*.hbs')
        .pipe(gulpHandlebars(templateData, options))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/hbs/**/*.hbs', ['handlebars']);
});

gulp.task('default', ['sass:watch', 'serve'] );