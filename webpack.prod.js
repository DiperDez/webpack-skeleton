const HtmlWebPack    = require('html-webpack-plugin'),
      MiniCssExtract = require('mini-css-extract-plugin'),
      Copy           = require('copy-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin'),
      Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser
        ]
    },
    plugins: [
         
        new HtmlWebPack({
            template: './src/index.html',
            /* filename: './index.html' */
        }),
        
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new Copy({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}

