var path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js'],
		alias: {
			'react-mgr': path.join(__dirname, '..', '..', 'lib')
		}
	},
	module: {
		loaders: [
			{ test: /\.(js)(\?.*)?$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	}
};
