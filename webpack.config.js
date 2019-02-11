const path = require('path');

module.exports = {
    entry: './brower-entry.js',
    output: {
        filename: 'geezify.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};