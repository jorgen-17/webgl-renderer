const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env;

let libraryName = 'webgl-renderer';

let plugins = [];
let outputFile = "";

if (env === 'build')
{
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
}
else
{
    outputFile = libraryName + '.js';
}

module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "index.js",
        path: __dirname + "/lib"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        modules: [path.resolve('./src')],
        extensions: [".ts"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },

    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    }
};