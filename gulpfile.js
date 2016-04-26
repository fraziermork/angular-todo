'use strict';



//__________________________________________________________________
// VARIABLE DECLARATIONS
//__________________________________________________________________
const gulp    = require('gulp');
const eslint  = require('gulp-eslint');
const mocha   = require('gulp-mocha');
const webpack = require('webpack-stream');
const del     = require('del');


const PATHS = {
  'frontendJS': [__dirname + '/frontend/app/*.js', __dirname + '/frontend/app/components/**/*.js'], 
  'backendJS': [__dirname + '/backend/**/*.js', __dirname + '/frontend/app/server.js'],
  'html': [__dirname + '/frontend/app/main/index.html', __dirname + '/frontent/app/components/**/*.html'],
  'css': [__dirname + '/frontend/app/css/*.css'], 
  'build': __dirname + '/frontend/build/'
};


//__________________________________________________________________
// GENERAL TASKS
//__________________________________________________________________
gulp.task('eslint', () => {
  gulp.src(PATHS.backendJS.concat(PATHS.frontendJS))
    .pipe(eslint())
    .pipe(eslint.format());
});



//__________________________________________________________________
// FRONTEND
//__________________________________________________________________
gulp.task('app:build-clear', () => {
  return del([PATHS.build + '*']);
});
gulp.task('app:build-html', () => {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-css', () => {
  return gulp.src(PATHS.css)
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-js', () => {
  return gulp.src(__dirname + 'frontend/app/main/entry.js')
    .pipe(webpack(require()))
    .pipe(gulp.dest(PATHS.build));
});
gulp.task('app:build-all', ['app:build-clear', 'app:build-html', 'app:build-css', 'app:build-js'], () => {
  console.log('------------------------REBUILT APP--------------------');
});
gulp.task('app:watch', () => {
  gulp.watch(__dirname + '/frontend/app/**', ['app:build-all']);
});




//__________________________________________________________________
// TESTS
//__________________________________________________________________
gulp.task('test:api', () => {
  return gulp.src(__dirname + '/test/api/*.js')
    .pipe(mocha());
});



//__________________________________________________________________
// BUILD TESTS
//__________________________________________________________________
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
