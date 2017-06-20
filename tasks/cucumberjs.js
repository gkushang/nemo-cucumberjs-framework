'use strict';

module.exports = function cucumberjs(grunt) {

    grunt.loadNpmTasks('grunt-cucumberjs');

    return {
        options: {
            formats: ['html', 'pretty'],
            output: 'acceptance/report/cucumber_report.html',
            theme: 'bootstrap',
            tags: grunt.option('tags'),
            saveJson: true,
            debug: true,
            launchReport: false,
            executeParallel: grunt.option('executeParallel') || false,
            require: grunt.option('require', 'acceptance/step_definitions/')
        },
        src: ['acceptance/features/']
    };
};
