module.exports = {
	//entry  : './es6/input.js',
	entry  : './es6/index.ts',
	output : {
		path     : './dist/',
		filename : 'output.js'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module : {
		loaders: [ {
			test   : /.js$/,
			loader : 'babel-loader'
		}, {
			test   : /.ts$/,
			loader : 'ts-loader'
		}
		]
	}
};