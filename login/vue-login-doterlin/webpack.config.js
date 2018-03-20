//명령 사용：'npm run build'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/app.js',
  //build.js 파일에서 패키지가 생성 된 후
  output: {
    path: './js',
    publicPath: './assets',
    filename: 'build.js'
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue',
        options:{}
      },
      //ES6 구문 변환
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      //이미지 변환, 8K 미만이 자동으로 base64 인코딩으로 변환 됨
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?name=assets/[name][hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("author: lhq\n" + new Date().toLocaleString()),
    new webpack.optimize.UglifyJsPlugin({ //압축 플러그인
      compress: {
        warnings: false //경고가 표시되지 않습니다.
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  //여기에 babel을 설치하는 데 사용됩니다. 루트 디렉토리에 .babelrc 구성이 있으면 여기에 쓰지 마십시오.
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
