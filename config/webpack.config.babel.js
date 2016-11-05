import path                     from 'path';
import webpack                  from 'webpack';
import htmlWebpackPlugin        from 'html-webpack-plugin';
import webpackMerge             from 'webpack-merge';
import autoprefixer             from 'autoprefixer';
import cssnano                  from 'cssnano';

let config;

const ROOT_PATH       = path.resolve(__dirname, '..');
const APP_PATH        = path.resolve(ROOT_PATH, 'src');
const EXAMPLES_PATH   = path.resolve(ROOT_PATH, 'examples');

const COMMON_CONFIG = {
  entry: [
    APP_PATH
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!eslint',
      include: [APP_PATH, EXAMPLES_PATH]
    }]
  },
  eslint: {
    configFile: path.resolve(ROOT_PATH, 'config', 'eslint.json'),
    emitError: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'css', 'sass'],
    modulesDirectories: ['node_modules'],
  },
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: [
          '>1%',
          'last 4 versions',
          'not ie < 9'
        ]
      },
      safe: true,
      discardComments: {
        removeAll: true
      }
    })
  ]
};

const DEVELOPMENT_CONFIG = {
  module: {
    loaders: [{
      test: /\.sass$/,
      loader: 'style!css?modules&importLoaders=2&camelCase&localIdentName=[folder]__[local]___[hash:base64:5]&sourceMap!postcss!sass?sourceMap&outputStyle=expanded',
      include: [APP_PATH, EXAMPLES_PATH]
    }]
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8000',
    'webpack/hot/only-dev-server',
    EXAMPLES_PATH
  ],
  resolve: {
    alias: {
      "animate": path.resolve(APP_PATH, 'index.js')
    }
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    port: 8000,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      title: 'Examples',
      template: path.resolve(EXAMPLES_PATH, 'index.ejs')
    })
  ]
};

config = webpackMerge(COMMON_CONFIG, DEVELOPMENT_CONFIG);

export default config;
