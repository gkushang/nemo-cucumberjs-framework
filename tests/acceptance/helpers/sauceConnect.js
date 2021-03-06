//script to launch shared sauce tunnel
//setup SAUCE_USERNAME & SAUCE_ACCESSKEY env variable values before running the script
//How to launch the tunnel:
//automation-utils$ SAUCE_USERNAME=XXXX SAUCE_ACCESSKEY=XXXX node lib/sauceconnect/sauceConnect.js

var sauceConnectLauncher = require('sauce-connect-launcher'),
    options = {

        // Sauce Labs username.  You can also pass this through the
        // SAUCE_USERNAME environment variable
        username: process.env['SAUCE_USERNAME'],

        // Sauce Labs access key.  You can also pass this through the
        // SAUCE_ACCESS_KEY environment variable
        accessKey: process.env['SAUCE_ACCESSKEY'],

        // Log output from the `sc` process to stdout?
        verbose: false,

        // Enable verbose debugging (optional)
        verboseDebugging: false,

        // Port on which Sauce Connect's Selenium relay will listen for
        // requests. Default 4445. (optional)
        port: null,

        // Proxy host and port that Sauce Connect should use to connect to
        // the Sauce Labs cloud. e.g. "localhost:1234" (optional)
        proxy: null,

        // Change sauce connect logfile location (optional)
        logfile: null,

        // Period to log statistics about HTTP traffic in seconds (optional)
        logStats: null,

        // Maximum size before which the logfile is rotated (optional)
        maxLogsize: null,

        // Set to true to perform checks to detect possible misconfiguration or problems (optional)
        doctor: null,

        // Identity the tunnel for concurrent tunnels (optional)
        tunnelIdentifier: null,

        // an array or comma-separated list of regexes whose matches
        // will not go through the tunnel. (optional)
        fastFailRexegps: null,

        // an array or comma-separated list of domains that will not go
        // through the tunnel. (optional)
        directDomains: null,

        'shared-tunnel': true,
        // A function to optionally write sauce-connect-launcher log messages.
        // e.g. `console.log`.  (optional)
        logger: function (message) {
        },

        // an optional suffix to be appended to the `readyFile` name.
        // useful when running multiple tunnels on the same machine,
        // such as in a continuous integration environment. (optional)
        readyFileId: null
    };

sauceConnectLauncher(options, function (err, sauceConnectProcess) {
});