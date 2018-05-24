'use strict'

import React from 'react'
import gulp from 'gulp'
import gutil from 'gulp-util'
import template from 'gulp-template'
import uglify from 'gulp-uglify';
import htmlreplace from 'gulp-html-replace'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import streamify from 'gulp-streamify'

require('intl')

var path = {
    HTML: 'src/index.html',
    STATIC: 'src/static/**/*.*',
    ALL: ['src/**/*.js', 'src/static/**/*.*'],
    ENTRY_POINT: ['src/start.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/',
    DEST: 'dist',
    TEMPLATE_INDEX: 'src/index.html',
    STATIC_INDEX: 'index.html'
}

function bundler() {
    const transformer = babelify.configure({
        presets: ["es2015", "react"]
    })
    var props = {
        cache: {}, packageCache: {}, fullPaths: true,
        entries: [path.ENTRY_POINT],
        transform: [transformer],
        debug: true
    }
    return browserify(props)
}

function baseBuild() {
    return browserify({
        entries: [path.ENTRY_POINT]
    }).
        transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .bundle()
        .pipe(source(path.MINIFIED_OUT));
}

gulp.task('build-watch', function () {
    gulp.watch(path.STATIC, ['copy'])
    const myBundler = watchify(bundler())
    const bundle = function () {
        myBundler.bundle()
            .on('error',function(e){
                gutil.log(e);
            })
            .pipe(source(path.MINIFIED_OUT))
            .pipe(gulp.dest(path.DEST_BUILD))
        console.log("updated")
    }
    myBundler.on('update', bundle)
    bundle();
})

gulp.task('copy', function () {
    gulp.src([path.STATIC, path.HTML])
        .pipe(gulp.dest(path.DEST));
})

gulp.task('build-dev', function () {
    baseBuild()
        .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('build', function () {
    baseBuild()
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('renderStatic', function () {
    var staticContent = <Provider store={store}><App><Start /></App></Provider>
    var staticReact = require('./src/renderToString')(
        staticContent)

    return gulp.src(path.TEMPLATE_INDEX).
        pipe(template({ staticReact: staticReact })).
        pipe(gulp.dest(path.DEST_BUILD))
})

gulp.task('release', ['copy', 'build']);

gulp.task('watch', ['copy', 'build-watch']);

gulp.task('dev', ['copy', 'build-dev']);

gulp.task('default', ['watch'])
