'use strict';

const gulp          = require('gulp');
const concat        = require('gulp-concat');
const connect       = require('gulp-connect');
const templateCache = require('gulp-angular-templatecache');

const DIST_FOLDER = './dist';

const vendorJs = [
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
];
const appJs = [
    'src/app/*.module.js',
    'src/app/*.routes.js',
    'src/app/filters/**/*.js',
    'src/app/services/**/*.js',
    'src/app/components/**/*.js'
];
const vendorAssets = [
    './node_modules/bootstrap/dist/**/bootstrap.min.css',
    './node_modules/bootstrap/dist/**/glyphicons*.*',
];

// SCRIPTS

gulp.task(
    'js:vendor',
    () => gulp.src(vendorJs)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(`${DIST_FOLDER}/assets/`))
);

gulp.task(
    'js:app',
    () => gulp.src(appJs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(`${DIST_FOLDER}/assets/`))
);

gulp.task('js', ['js:vendor', 'js:app']);

// TEMPLATES

gulp.task(
    'templates',
    () => gulp.src('src/app/**/*.html')
        .pipe(templateCache('templates.js', { module: 'templates', standalone: true }))
        .pipe(gulp.dest(`${DIST_FOLDER}/assets/`))
);

// COPY

gulp.task(
    'copy:assets',
    () => gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest(`${DIST_FOLDER}/assets/`))
);

gulp.task(
    'copy:assets:vendor',
    () => gulp.src(vendorAssets)
        .pipe(gulp.dest(`${DIST_FOLDER}/assets/`))
);

gulp.task(
    'copy:html',
    () => gulp.src('src/*.html')
        .pipe(gulp.dest(`${DIST_FOLDER}/`))
);

gulp.task('copy', ['copy:assets', 'copy:assets:vendor', 'copy:html']);

// DIST

gulp.task('dist', ['js', 'templates', 'copy']);

// CONNECT

gulp.task(
    'connect',
    ['dist'],
    () => connect.server({
        port: 3000,
        root: 'dist',
        livereload: true
    })
);

gulp.task(
    'reload',
    () => gulp.src(DIST_FOLDER)
        .pipe(connect.reload())
);

// WATCH

gulp.task(
    'dev',
    ['connect'],
    () => {
        gulp.watch('src/app/**/*.js', ['js:app']);
        gulp.watch('src/app/**/*.html', ['templates']);
        gulp.watch('src/*.html', ['copy:html']);
        gulp.watch('src/assets/**/*.*', ['copy:assets']);
        gulp.watch('dist/**', ['reload']);
    }
);
