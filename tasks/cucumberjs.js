'use strict';
var packageJson = require('../package.json');
var config = require('../acceptance/config/config.json');
var sauceJson = require('../acceptance/config/sauce.json');
var Keys = require('../acceptance/config/utils/keys');

module.exports = function cucumberjs(grunt) {

    grunt.loadNpmTasks('grunt-cucumberjs');

    var sauce = process.env[Keys.SAUCE];

    function getBrowser() {
        if (sauce) {
            if (!sauceJson[sauce]) {
                throw new Error('SAUCE value ' + sauce + ' does not exists. Please verify your command line arguments.');
            }

            var sauceInfo = sauceJson[sauce].driver.serverCaps;
            return sauceInfo.browserName + ' ' + sauceInfo.version + ', ' + sauceInfo.platform;
        } else {
            return process.env[Keys.BROWSER] || config.BROWSER;
        }
    }

    function getTags() {
        var tags = grunt.option('tags');
        if (tags) return tags + ' and not @skip';
        else return 'not @skip';
    }

    return {
        options: {
            formats: ['html', 'pretty'],
            output: 'acceptance/report/cucumber_report.html',
            theme: 'bootstrap',
            tags: getTags(),
            saveJson: true,
            debug: true,
            launchReport: true,
            executeParallel: grunt.option('parallel') || false,
            require: grunt.option('require', 'acceptance/step_definitions/'),
            metadata: {
                "App Name": packageJson.name,
                "App Version": packageJson.version,
                "Environment": "staging",
                "Browser": getBrowser(),
                "Parallel": grunt.option('parallel') || 'false',
                "Executed": sauce ? 'remote' : 'local'
            }
        },
        src: ['acceptance/features/']
    };
};
