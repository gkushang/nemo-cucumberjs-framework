var replicateTask = require('cucumber-replicate').task;
var commonConfig = require('./tests/acceptance/config/config.json');

module.exports = function(grunt) {

    require('load-grunt-config')(grunt, {
        configPath: require('path').resolve('tasks')
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-force-task');

    require('time-grunt')(grunt);

    var replicate = replicateTask({
        baseDir: commonConfig.baseDir,
        grunt: grunt,
        key: 'SAUCE' //to run tests on SauceLabs
    });

    // replicate features for the parallel run
    grunt.registerTask('replicate', replicate.features);

    // clean up replicated features
    grunt.registerTask('clean-replicate', replicate.clean);

    // exit from the cucumberjs task
    grunt.registerTask('exit', replicate.exit.fromTask('cucumberjs:acceptance'));

    // Acceptance
    grunt.registerTask('acceptance', ['clean', 'clean-replicate', 'replicate', 'force:cucumberjs',
        'force:clean-replicate', 'exit']);
};