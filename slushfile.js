/*
 * slush-gulp-broswer-sync
 * https://github.com/damasio34/slush-gulp-broswer-sync
 *
 * Copyright (c) 2015, Darlan Damasio
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {

    //Answers
    var prompts = [
    	{
	        name: 'appName',
	        message: 'Qual o nome do projeto?'
	    }, 
	    {
	    	name: 'appDescription',
	        message: 'Qual a descrição do projeto?'
	    }, 
	    {
	        name: 'appVersion',
	        message: 'Qual a versão?',
	        default: '1.0.0'
	    }, 
	    {
	        name: 'appAuthor',
	        message: 'Nome do autor?'
	    }
    ];

    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.appName) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName)
            
            gulp.src(__dirname + '/template/**')
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});