const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

function NoopPlugin() {}
NoopPlugin.prototype.apply = () => {};

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: isDev
});

module.exports = {
  entry: "./src/client/index.ts",
  devtool: isDev ? "inline-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html"
    }),
    extractSass,
    isDev
      ? new NoopPlugin()
      : new UglifyJsPlugin({
          sourceMap: true
        })
  ],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  }
};
