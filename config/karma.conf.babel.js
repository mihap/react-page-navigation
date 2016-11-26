import { APP_PATH } from './webpack.config.common.babel';
import TEST_CONFIG from './webpack.config.test.babel';

const KARMA_CONFIG = (config) =>
  config.set({
    basePath: APP_PATH,

    frameworks: ['jasmine'],

    files: [
      'spec/spec_helper.js'
    ],

    preprocessors: {
      'spec/spec_helper.js': ['webpack', 'sourcemap']
    },

    webpack: TEST_CONFIG,

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['progress'],

    port: 8080,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome']
  });

export default KARMA_CONFIG;

