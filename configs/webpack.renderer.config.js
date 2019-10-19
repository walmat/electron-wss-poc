
const rules = require("./webpack.rules")
  .concat(
    [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:
        {
          loader: "babel-loader",
          options: { cacheDirectory: true }
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: "url-loader"
      },
      {
        test: /\.svg$/,
        use:
          [
            {
              loader: "@svgr/webpack",
              options:
              {
                icon: true
              }
            }
          ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options:
            {
              modules: true,
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: "file-loader",
      }
    ]
  );

module.exports =
  {
    module:
    {
      rules
    },
    resolve:
    {
      extensions: [".js", ".jsx", ".json"]
    }
  };
