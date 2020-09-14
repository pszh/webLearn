const path = require("path");
const testPlugins = require("./plugins/TestPlugins");
module.exports = {
  mode: "development",
  entry: "./src/home.js",

  output: {
    filename: "build.js",
    path: path.resolve(__dirname, ""),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, "loader", "style-loader"),
          path.resolve(__dirname, "loader", "less-loader"),
        ],
      },
    ],
  },
  plugins: [new testPlugins()],
};
