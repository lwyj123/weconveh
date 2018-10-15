const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');
// const DropHashWebpackPlugin = require('./drop-hash-webpack-plugin');

const resolve = function() {
    const args = Array.prototype.slice.call(arguments);
    return path.resolve.apply(path, [__dirname, '..'].concat(args));
};

const entries = {
    home: resolve('src/entries/home/index.tsx'),
};

const htmls = [
    {
        name: 'home.html',
        chunks: ['home'],
        template: resolve('src/entries/template/index.html'),
    }
];

const createHtmlWebpackPlugin = htmls =>
    htmls.map(({ name, chunks, template }) => {
        return new HtmlWebpackPlugin({
            filename: name,
            template: template,
            chunks: ['vendor', ...chunks],
        });
    });


const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: [
            autoprefixer({
                browsers: [
                    'Android >= 4.4',
                    'iOS >= 8',
                ],
            }),
        ],
    },
};

const createCommonConfig = (entry, htmls) => {
    return {
        entry,
        output: {
            path: resolve(config.output),
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules(?!\/webpack-dev-server)/,
                },
                {
                    test: /\.(tsx|ts)?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['react-hot-loader/babel'],
                            },
                        },
                        {
                            loader: 'ts-loader',
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        postCSSLoader,
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        postCSSLoader,
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader',
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '~': resolve('src'),
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            ...createHtmlWebpackPlugin(htmls),
            // new DropHashWebpackPlugin({
            //     // 清除各个非commons的chunk的hash后缀，比如read-status-pv1
            // }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial',
                        minChunks: Math.ceil(Object.keys(entry).length / 2),
                    },
                    default: false,
                },
            },
        },
    };
};

const configs = [];

if (Object.keys(entries).length > 0) {
    configs.push(createCommonConfig(entries, htmls, true));
}

module.exports = configs;
