const { override, overrideDevServer } = require("customize-cra");

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      "/api": {
        target: "https://api.uomg.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  };
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
