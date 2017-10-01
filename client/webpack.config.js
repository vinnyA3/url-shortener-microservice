const webpack = require('webpack');
const { port } = require('./config')
const path = require('path')

module.exports = {
	entry: './src/index',
	output: {
        path: path.resolve(__dirname, '/public'),
		filename: 'bundle.js',
		publicPath: `http://localhost:${port}/`
	},
  devtool: 'cheap-eval-source-map',
  target: 'web',
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.jsx']
  },
	module: {
		loaders: [
      {
			  test: /\.jsx?$/,
			  loader: 'babel-loader'
		  },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, 'src/styles/utils/_mixins.scss'),
                path.resolve(__dirname, 'src/styles/utils/_extends.scss')
              ]
            }
          }
        ]
      }
    ]
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
