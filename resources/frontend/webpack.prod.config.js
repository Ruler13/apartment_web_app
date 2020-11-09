const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Sass = require('sass');
const ManifestPlugin = require('webpack-manifest-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const {filesToInclude} = require('./common_config.js');

const root = path.resolve('../../public');
const folderName = 'frontend';
const outputPath = path.resolve(root, './', folderName);

/**
 * @param {string} path
 * @returns {string}
 */
function removeHash (path) {
  return path.replace(/\.[a-f0-9]{32}/, '');
}

/**
 * @param {string} string
 * @returns {string}
 */
function escapeString (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const fileMappings = {};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    '/js/main': [
      path.resolve('./src/main.js'),
    ],
  },
  output: {
    path: outputPath,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue'],
    symlinks: false,
  },
  plugins: [
    // Clean folder before building
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // Create manifest file for laravel
    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: `/${folderName}`,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: '/js/runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: '/js/vendor',
          test: /node_modules/,
          chunks: 'all',
        },
        main: {
          name: '/js/main',
          test: /src/,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve('./src'),
          path.resolve('./node_modules/vuetify/lib'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('./'),
              },
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('./'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
      // All asset files inside node_modules should also be under node_modules when compiled
      {
        test: filesToInclude,
        loader: 'file-loader',
        include: path.resolve('./node_modules'),
        options: {
          esModule: false,
          context: path.resolve('./'),
          name: '[path][name].[hash].[ext]',
          outputPath: '/assets',
          publicPath: `${folderName}/assets/`,
        },
      },
      // All Project asset files should be under assets directly
      {
        test: filesToInclude,
        loader: 'file-loader',
        include: path.resolve('./src/assets'),
        options: {
          esModule: false,
          context: path.resolve('./src/assets'),
          name: '[path][name].[hash].[ext]',
          outputPath: '/assets',
          publicPath: `${folderName}/assets/`,
        },
      },
    ],
  },
};
