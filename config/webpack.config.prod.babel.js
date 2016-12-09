import webpack       from 'webpack';
import webpackMerge  from 'webpack-merge';

import COMMON_CONFIG, {
  DIST_PATH,
  EXAMPLES_PATH
} from './webpack.config.common.babel';


const PRODUCTION_CONFIG = {
  entry: [
    EXAMPLES_PATH
  ],
  output: {
    path: DIST_PATH,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
};

export default  webpackMerge(COMMON_CONFIG, PRODUCTION_CONFIG);
