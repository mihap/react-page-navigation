import path                     from 'path';
import webpack                  from 'webpack';
import htmlWebpackPlugin        from 'html-webpack-plugin';
import webpackMerge             from 'webpack-merge';

import COMMON_CONFIG, {
  APP_PATH,
  EXAMPLES_PATH
} from './webpack.config.common.babel';


const DEVELOPMENT_CONFIG = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!eslint',
      include: [EXAMPLES_PATH]
    }, {
      test: /\.sass$/,
      loader: 'style!css?modules&importLoaders=2&camelCase&localIdentName=[folder]__[local]___[hash:base64:5]&sourceMap!postcss!sass?sourceMap&outputStyle=expanded',
      include: [EXAMPLES_PATH]
    }, {
      test: /\.(ttf|woff)$/,
      loader: 'base64-font-loader',
      include: [EXAMPLES_PATH]
    }]
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    'webpack/hot/only-dev-server',
    EXAMPLES_PATH
  ],
  resolve: {
    alias: {
      'react-page-navigation': path.resolve(APP_PATH, 'index.js'),
      assets: path.resolve(EXAMPLES_PATH, 'assets')
    }
  },
  sassLoader: {
    includePaths: [path.resolve(EXAMPLES_PATH, 'assets')]
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    port: 8000,
    inline: true,
    progress: true,
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      title: 'Examples',
      template: path.resolve(EXAMPLES_PATH, 'index.ejs')
    })
  ]
};

export default webpackMerge(COMMON_CONFIG, DEVELOPMENT_CONFIG);
