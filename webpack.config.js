const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      'webpack-dev-server/client?http://localhost:8080',
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口，可以换成本机ip

      'webpack/hot/only-dev-server',
      // 为热替换(HMR)打包好代码
      // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
      './app/index.js'
      // 我们 app 的入口文件
    ],
    vendor: ['react', 'react-router']
    // 公共文件打包
  },
  output: {
    path: defPath.DEV_PATH,
    // 所有输出文件的目标路径

    filename: 'js/bundle.js',

    publicPath: '/',

    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css|less)$/,
        include: APP_PATH,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: (loader) => [
                autoprefixer(config.autoConfig)
              ]
            }
          },
          'sass-loader' + config.sassLoaderSuffix
        ]
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
        include: APP_PATH,
        loader: 'url-loader?limit=8192&name=imgs/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 控制台输出模块命名美化
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Webpack 3 中提供了插件来允许开发者启用作用域提升特性来避免这种额外的性能损耗
    new webpack.LoaderOptionsPlugin({ //浏览器加前缀
      options: {
        postcss: [require('autoprefixer')({ browsers: ['last 5 versions'] })]
      }
    }),
  ],
  devServer: {
    // ... 其他配置

    hot: true,
    // 开启服务器的模块热替换(HMR)

    contentBase: defPath.DEV_PATH,
    // 输出文件的路径

    publicPath: '/'
    // 和 output 的 publicPath 保持一致
  }
};