const path = require('path');

module.exports = {
  devServer: {
    //contentBase: './dist'
  },
  devtool: 'inline-source-map',
  entry: './src/js/main.js',
  /*entry: {
    main: './src/js/main.js',
  },*/
  /*plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // Specify the common bundle's name.
    })
  ],*/
  output: {
    filename: 'bundle.js',
    //path: path.resolve(__dirname, 'dist'),
    //publicPath: '/',
  }
};
