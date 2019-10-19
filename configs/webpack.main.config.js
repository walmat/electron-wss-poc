
module.exports =
  {
    entry: "./src/main/index.js",
    module:
    {
      // eslint-disable-next-line global-require
      rules: require("./webpack.rules")
    },
  };
