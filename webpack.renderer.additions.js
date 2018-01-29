module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          },
          {
            loader: "angular2-template-loader"
          }
        ]
      },
      {
        test: /\.mcss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader',
        ],
      },
    ]
  }
};
