// auth/webpack.config.js
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJson = require('./../package.json');

const path = require('path');

const devConfig = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,  // Enable hot module replacement
    historyApiFallback: {
      index: '/index.html',
    },
    watchFiles: ['src/**/*'], // Watches files in the src directory
  },
  output: {
    publicPath: 'http://localhost:3000/',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        auth: 'auth@http://localhost:3001/remoteEntry.js',
        songLibrary: 'songLibrary@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'react-redux': { singleton: true, requiredVersion: packageJson.dependencies['react-redux']},
        '@mui/material': { singleton: true, requiredVersion: packageJson.dependencies['@mui/material'] },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  
};

module.exports = merge(commonConfig, devConfig);
