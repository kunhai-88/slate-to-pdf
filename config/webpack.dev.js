const path = require('path');

module.exports ={
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
     path: path.resolve(__dirname,'../dist' ),
     filename: '[name].js',
  },
  module: {
    rules:[
      {
        test: /\.js|jsx$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              'react',
            ],
            plugins: [
              ['transform-object-rest-spread', { useBuiltIns: true }],
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-exponentiation-operator',
            ],
          },
        }],
      },
      {
        test: /\.less$/,
        use:[
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'},
        ]
      },
      {
        test: /\.css$/,
        use:[
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ]
      },
      {
        test: /\.json/,
        type: 'javascript/auto',
        use: [
          {loader: 'raw-loader'}
        ],
      },
    ],
  },
  plugins: [],
  devServer:{
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 9090,
  }
}