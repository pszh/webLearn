const path = require('path');
const DonePlugins = require('./plugins/DonePlugins');
const AsyncPlugin = require('./plugins/AsyncPlugin');
const FileListPlugin = require('./plugins/FileListPlugin')
module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new DonePlugins(),new AsyncPlugin(),new FileListPlugin({fileName:'list.md'})],
};
