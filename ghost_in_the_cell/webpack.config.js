module.exports = {
	entry  : './ts/index.ts',
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