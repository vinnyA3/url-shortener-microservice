const webpack = require('webpack');
const { port } = require('./config')

module.exports = {
	entry: './src/index.js',
	output: {
        path: __dirname + '/public',
		filename: 'bundle.js',
		publicPath: `http://localhost:${port}/`
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: './',
		port, 
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
