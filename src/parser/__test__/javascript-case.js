const path = require('path');
const fs = require('fs');
const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const readCookie = cookieFile => {
    try {
        if (!cookieFile) {
            return null;
        }
        const content = fs.readFileSync(cookieFile, {
            encoding: 'utf8',
        });
        return content;
    } catch (ex) {
        return null;
    }
};

module.exports = {
    lintOnSave: false,
    outputDir: process.env.NODE_ENV === 'production'
            ? 'output/webroot/learning-opadmin-fe/static'
            : 'output',
    configureWebpack: {
        output: {
            publicPath:
                process.env.NODE_ENV === 'production'
                    ? '//s2.pstatp.com/pgc/v2/resource/learning-opadmin-fe/static/'
                    : './',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': process.env.NODE_ENV,
                'process.env.DATA_ENV': process.env.BUILD_BRANCH === 'master' ? '"online"' : '"offline"',
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(
                    __dirname,
                    'src',
                    'entries',
                    'home',
                    'index.html'
                ),
            }),
            new HtmlWebpackPlugin({
                filename: 'ttds.html',
                template: path.join(
                    __dirname,
                    'src',
                    'entries',
                    'toutiao-data-sync',
                    'index.html'
                ),
            }),
        ],
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
            },
        },
    },
    devServer: {
        hot: true,
        proxy: {
            '/v1': {
                target: 'https://learningtest.bytedance.net',
                headers: {
                    cookie: readCookie(path.join(__dirname, '.cookie')),
                },
            },
            '/v2': {
                target: 'https://learningtest.bytedance.net',
                // target: 'http://10.3.23.40:9110',
                headers: {
                    cookie: readCookie(path.join(__dirname, '.cookie')),
                },
            },
        },
    },
};
