const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "none",
    entry: {
        bundle: "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /index\.html/,
                use: [
                    {loader: "file-loader", options: {name: "index.html"}}
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    require("precss"),
                                    require("autoprefixer")
                                ];
                            }
                        }
                    },
                    {loader: "sass-loader"}
                ]
            },
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {enforce: "pre", test: /\.tsx?$/, loader: "tslint-loader", options: {}},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    plugins: [new CopyWebpackPlugin([
        {from: "node_modules/react/umd/react.development.js", to: "react.development.js"},
        {from: "node_modules/react-dom/umd/react-dom.development.js", to: "react-dom.development.js"},
        {from: "node_modules/mathjax/MathJax.js", to: "MathJax.js"},
    ])],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "MathJax": "MathJax"
    }
};