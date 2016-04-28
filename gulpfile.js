'use strict';



//____________________________________________________________________________________________________________________________________
// VARIABLE DECLARATIONS
//____________________________________________________________________________________________________________________________________
const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const mocha   = require('gulp-mocha');
const webpack = require('webpack-stream');
const del     = require('del');

const PATHS = {
  'frontendJS': [__dirname + '/frontend/app/*.js', __dirname + '/frontend/app/components/**/*.js'], 
  'backendJS': [__dirname + '/backend/**/*.js', __dirname + '/frontend/app/server.js'],
  'html': [__dirname + '/frontend/app/main/index.html', __dirname + '/frontend/app/components/**/*.html'],
  'css': [__dirname + '/frontend/app/css/*.css'], 
  'build': __dirname + '/frontend/build/'
};



//____________________________________________________________________________________________________________________________________
// GENERAL TASKS
//____________________________________________________________________________________________________________________________________
gulp.task('eslint', () => {
  gulp.src(PATHS.backendJS.concat(PATHS.frontendJS))
    .pipe(eslint())
    .pipe(eslint.format());
});



//____________________________________________________________________________________________________________________________________
// FRONTEND
//____________________________________________________________________________________________________________________________________
gulp.task('app:build-clear', () => {
  return del([PATHS.build + '*']);
});
gulp.task('app:build-html', () => {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(__dirname + '/frontend/build'));
});
gulp.task('app:build-css', () => {
  return gulp.src(PATHS.css)
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-js', () => {
  return gulp.src(__dirname + 'frontend/app/main/entry.js')
    .pipe(webpack(require(__dirname + '/frontend/webpack.config.js')))
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-all', ['app:build-clear', 'app:build-html', 'app:build-css', 'app:build-js'], () => {
  console.log('------------------------REBUILT APP--------------------');
});
gulp.task('app:watch', () => {
  gulp.watch(__dirname + '/frontend/app/**', ['app:build-all']);
});


//____________________________________________________________________________________________________________________________________
// TESTS
//____________________________________________________________________________________________________________________________________
gulp.task('test:api', () => {
  return gulp.src(__dirname + '/test/api/*.js')
    .pipe(mocha());
});



//____________________________________________________________________________________________________________________________________
// BUILD TESTS
//____________________________________________________________________________________________________________________________________
gulp.task('test:bundle-clear', () => {
  return del([__dirname + '/tests/bundles/*']);
});
gulp.task('test:bundle-unit', () => {
  return gulp.src(__dirname + '/tests/unit/entry.js')
    .pipe(webpack({ output: { filename: 'unit_bundle.js' } }))
    .pipe(gulp.dest(__dirname + '/test/bundles/'));
});
gulp.task('test:bundle-e2e', () => {
  return gulp.src(__dirname + '/tests/e2e/entry.js')
    .pipe(webpack({ output: { filename: 'e2e_bundle.js' } }))
    .pipe(gulp.dest(__dirname + '/test/bundles/'));
});
gulp.task('test:bundle-all', ['test:bundle-clear', 'test:bundle-unit', 'test:bundle-e2e'], () => {
  console.log('------------------------REBUILT TESTS--------------------');
});
gulp.task('test:watch', () => {
  gulp.watch([__dirname + '/test/e2e/*_spec.js', __dirname + '/test/unit/*_spec.js'], ['test:bundle-all']);
});
