import path                     from 'path';
import webpack                  from 'webpack';
import webpackMerge             from 'webpack-merge';

import COMMON_CONFIG, {
  TEST_PATH,
  APP_PATH
} from './webpack.config.common.babel';

const TEST_CONFIG = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!eslint',
      include: [TEST_PATH]
    }]
  },
  resolve: {
    alias: {
      "react-page-navigation": path.resolve(APP_PATH, 'index.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('test')
      }
    })
  ],
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

export default webpackMerge(COMMON_CONFIG, TEST_CONFIG);
