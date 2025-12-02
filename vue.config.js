module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Floaty/" : "/",

  // Development server with proxy to avoid CORS issues
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.csfloat.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        logLevel: "debug",
      },
    },
  },
};
