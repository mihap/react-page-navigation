import path                     from 'path';
import webpack                  from 'webpack';
import htmlWebpackPlugin        from 'html-webpack-plugin';
import webpackMerge             from 'webpack-merge';

import COMMON_CONFIG, {
  EXAMPLES_PATH
} from './webpack.config.common.babel';


const DEVELOPMENT_CONFIG = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    'webpack/hot/only-dev-server',
    EXAMPLES_PATH
  ],
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
