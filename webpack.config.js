var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
		demo01_function_component: './src/demo01_function_component.js',
		demo02_class_component: './src/demo02_class_component.js',
		demo03: './src/demo03/demo03.js',
		demo04: './src/demo04/demo04.js',
	},
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: '[name].js',
//		chunkFilename: '[id].chunk.js'
    },
	plugins: [
//        new CommonsChunkPlugin("common")
    ],
    module: {
        loaders: [
            {
                test: /src\/.*.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['stage-1', 'react']
                }
            },
			{
				test: /react\/common\/.*.css$/,
				loader: 'style-loader!css-loader',
			},
            {
                test: /\.(png|jpg)/,
                loader: 'url-loader?limit=200000'
            }
        ]
    }
}
