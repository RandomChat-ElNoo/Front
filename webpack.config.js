// webpack.config.js
module.exports = {
  // 기존 설정
  module: {
    rules: [
      // 기존 로더 설정
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
};
