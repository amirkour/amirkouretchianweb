const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./Spa/React/Todos/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                // NOTE: loaders go bottom-to-top, right-to-left.
                // so for this one, webpack will use css-loader first,
                // then style-loader for files ending w/ .css.
                /*
                From https://webpack.js.org/concepts/loaders/:
                Loaders can be chained. Each loader in the chain applies transformations to the processed resource. 
                A chain is executed in reverse order. The first loader passes its result (resource with applied 
                transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned
                by the last loader in the chain.
                 */
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "wwwroot/js/"),
        publicPath: "/js/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/js/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};