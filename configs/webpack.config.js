const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/quagga.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'quagga.js',
        library: {
            type: 'module',
            export: 'default',
        },
        globalObject: 'this', // for UMD builds in various environments
        clean: true, // optional: clean output dir before emit
    },
    experiments: {
      outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.(t|j)sx?$/,
                use: 'source-map-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules',
        ],
        fallback: {
            fs: false,
        },
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './'),
        },
        hot: true,
        open: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(require(path.join(__dirname, './env/', process.env.BUILD_ENV))),
        }),
        new webpack.NormalModuleReplacementPlugin(
            /..\/input\/frame_grabber/,
            '../input/frame_grabber_browser.js'
        ),
        new webpack.NormalModuleReplacementPlugin(
            /^..\/input\/input_stream\/input_stream/,
            '../input/input_stream/input_stream_browser'
        ),
    ],
    optimization: {
        minimize: false,
    },
};
