const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
module.exports = {
  mode: 'production',
  entry: getEntry(),
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "ts-loader"
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    ...getFiles().map(item => {
      return new HtmlWebpackPlugin({
        filename: item.name + '.html',
        template: __dirname + '/template.html',
        chunks: [item.name]
      })
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./js/*'],
      cleanAfterEveryBuildPatterns: ['!**/*'],
    })
  ]
}



function getFiles() {
  var pages = fs.readdirSync(__dirname + '/src/pages')
  var page = pages.map(item => {
    var page_url = __dirname + '/src/pages/' + item
    var files = fs.readdirSync(page_url)
    return {
      name: item,
      html: page_url + '/' + files.find(file => /\.html$/.test(file)),
      tsx: page_url + '/' + files.find(file => /\.tsx$/.test(file))
    }
  })
  return page
}

function getEntry() {
  let entry = {}
  getFiles().forEach(item => {
    entry[item.name] = item.tsx
  })
  return entry
}