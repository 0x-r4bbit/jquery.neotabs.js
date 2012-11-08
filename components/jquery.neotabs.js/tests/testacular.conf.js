// Testacular configuration
// Generated on Thu Nov 01 2012 08:43:09 GMT+0100 (CET)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../components/jasmine-jquery/lib/jasmine-jquery.js',
  '../components/jquery/jquery.js',
  '../src/jquery.neotabs.js',
  'unit/specs.js',
];


// list of files to exclude
exclude = [
  '**/*.swp'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots'];


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['ChromeCanary'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
