import webpack                  from 'webpack';
import path                     from 'path';
import cssnano                  from 'cssnano';


export const ROOT_PATH       = path.resolve(__dirname, '..');
export const APP_PATH        = path.resolve(ROOT_PATH, 'src');
export const EXAMPLES_PATH   = path.resolve(ROOT_PATH, 'examples');
export const TEST_PATH       = path.resolve(ROOT_PATH, 'spec');
export const DIST_PATH       = path.resolve(ROOT_PATH, 'dist');

const env = process.env.NODE_ENV;

const COMMON_CONFIG = {
  entry: [
    APP_PATH
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!eslint',
      include: [APP_PATH, EXAMPLES_PATH]
    }, {
      test: /\.sass$/,
      loader: 'style!css?modules&importLoaders=2&camelCase&localIdentName=[folder]__[local]___[hash:base64:5]&sourceMap!postcss!sass?sourceMap&outputStyle=expanded',
      include: [APP_PATH, EXAMPLES_PATH]
    }, {
      test: /\.(ttf|woff)$/,
      loader: 'base64-font-loader',
      include: [APP_PATH, EXAMPLES_PATH]
    }]
  },
  sassLoader: {
    includePaths: [path.resolve(EXAMPLES_PATH, 'assets')]
  },
  eslint: {
    emitError: false
  },
  resolve: {
    extensions: ['', '.js', 'sass'],
    modulesDirectories: ['node_modules'],
    alias: {
      'react-page-navigation': path.resolve(APP_PATH, 'index.js'),
      assets: path.resolve(EXAMPLES_PATH, 'assets')
    }
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
          'not ie < 10'
        ]
      },
      safe: true,
      discardComments: {
        removeAll: true
      }
    })
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

export default COMMON_CONFIG;
