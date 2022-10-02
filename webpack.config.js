const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    let mode = 'development';
    if (argv.mode === 'production') {
        mode = 'production';
    }

    const config = {
        entry: './src/js/index.js',
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                title: 'Custom template',
                template: path.resolve(__dirname, './src/index.html'),
            }),
            new WebpackManifestPlugin(),
            new CopyPlugin({
                patterns: [{ from: path.resolve(__dirname, 'src/data'), to: path.resolve(__dirname, 'public/data') }],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.s?css$/,
                    use: [
                        mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, mode === 'development' ? 'dev' : 'public'),
            clean: true,
        },
        devtool: mode === 'development' ? 'source-map' : false,
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'src'),
            },
            port: 9090,
            compress: true,
            hot: true,
        },
    };

    return config;
};
