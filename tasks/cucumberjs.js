'use strict';
var packageJson = require('../package.json');
var config = require('../tests/acceptance/config/config.json');
var Keys = require('../tests/acceptance/config/utils/keys');

module.exports = function cucumberjs(grunt) {

    grunt.loadNpmTasks('grunt-cucumberjs');

    var sauce = process.env[Keys.SAUCE];

    function getBrowser() {
        return process.env[Keys.BROWSER] || process.env[Keys.SAUCE] || config.BROWSER;
    }

    function getTags() {
        var tags = grunt.option('tags');
        if (tags) return tags + ' and not @WIP';
        else return 'not @WIP';
    }

    return {
        acceptance: {
            options: {
                formats: ['html', 'pretty'],
                output: 'tests/acceptance/report/cucumber_report.html',
                theme: 'bootstrap',
                tags: getTags(),
                saveJson: true,
                debug: true,
                launchReport: true,
                executeParallel: grunt.option('parallel') || false,
                require: grunt.option('require', 'tests/acceptance/step_definitions/'),
                metadata: {
                    'App Name': packageJson.name,
                    'App Version': packageJson.version,
                    'Environment': 'staging',
                    'Browser': getBrowser(),
                    'Parallel': grunt.option('parallel') || 'false',
                    'Executed': sauce ? 'on saucelabs.com' : 'local'
                }
            },
            src: ['tests/acceptance/features/']
        }
    };
};
