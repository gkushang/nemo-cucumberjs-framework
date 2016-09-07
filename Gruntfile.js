var replicateTask = require('automation-utils').replicateTask;
var commonConfig = require('./acceptance/config/config.json');

module.exports = function(grunt) {
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    var replicate = replicateTask({
        baseDir: commonConfig.baseDir,
        grunt: grunt,
        key: 'SAUCE'
    });

    grunt.loadNpmTasks('grunt-force-task');

    // replicate features for the parallel run
    grunt.registerTask('replicate', replicate.features);

    // clean up replicated features
    grunt.registerTask('clean', replicate.clean);

    // exit from the cucumberjs task
    grunt.registerTask('exit', replicate.exit.fromTask('cucumberjs'));

    // Acceptance
    grunt.registerTask('acceptance', ['clean', 'replicate', 'force:cucumberjs',
        'force:clean', 'exit']);

};