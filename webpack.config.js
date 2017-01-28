var path = require("path");

module.exports = {
  entry:  './src',
  output: {
  	path: path.resolve(__dirname, "build"),
    filename: 'bundle.js',
    publicPath: "/assets/",
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: __dirname + '/src',
       }
    ],
  }
};
