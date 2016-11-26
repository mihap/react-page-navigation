import path                     from 'path';
import cssnano                  from 'cssnano';


export const ROOT_PATH       = path.resolve(__dirname, '..');
export const APP_PATH        = path.resolve(ROOT_PATH, 'src');
export const EXAMPLES_PATH   = path.resolve(ROOT_PATH, 'examples');
export const TEST_PATH       = path.resolve(ROOT_PATH, 'spec');


const COMMON_CONFIG = {
  entry: [
    APP_PATH
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!eslint',
      include: [APP_PATH]
    }]
  },
  eslint: {
    emitError: false
  },
  resolve: {
    extensions: ['', '.js', 'sass'],
    modulesDirectories: ['node_modules'],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      actions:    path.resolve(APP_PATH, 'actions'),
      reducers:   path.resolve(APP_PATH, 'reducers')
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
  ]
};

export default COMMON_CONFIG;
