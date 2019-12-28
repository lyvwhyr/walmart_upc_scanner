const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');


module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: {
        index: [
            "./src/main.js"
        ]
    },
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js",
        publicPath: "/",
        globalObject: "this"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            env: {
                NODE_ENV: "development",
                BASE_URL: "/"
            },
            template: path.resolve(process.cwd(), "public", "index.html")
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(process.cwd(), "public"),
                to: path.resolve(process.cwd(), "dist"),
                toType: "dir",
                ignore: [".DS_Store"]
            }
        ])
    ],
    watchOptions: {
        // ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 500
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                    },
                                    stage: 3,
                                })
                            ]
                        }
                    }
                ],
                sideEffects: true,
            },
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: false,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /\.module\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: false
                        }
                    },
                    "sass-loader"
                ],
                sideEffects: true,
            },
            {
                test: /\.module\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "img/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "img/[name].[hash:8].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "media/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "fonts/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.m?jsx?$/,
                exclude: [
                    function () {
                        /* omitted long function */
                    }
                ],
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    }
};
