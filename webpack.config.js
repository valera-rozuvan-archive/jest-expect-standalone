var webpack = require('webpack');

module.exports = {
    entry: {
        'expect': './index.js',
        'expect.min': './index.js',
    },
    devtool: 'source-map',
    output: {
        filename: './dist/[name].js',
        libraryTarget: 'umd',
        library: 'jestExpect'
    },
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            comments: false
        })
    ]
};
