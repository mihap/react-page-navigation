import webpack       from 'webpack';
import webpackMerge  from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import COMMON_CONFIG, {
  LIB_PATH
} from './webpack.config.common.babel';


const PRODUCTION_CONFIG = {
  output: {
    path: LIB_PATH,
    filename: 'ReactPageNavigation.min.js',
    libraryTarget: 'umd',
    library: 'ReactPageNavigation'
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
  ],
  externals: [nodeExternals({
    target: 'node',
    whitelist: ['mutation-observer', 'smoothscroll-polyfill']
  })]
};

export default  webpackMerge(COMMON_CONFIG, PRODUCTION_CONFIG);
