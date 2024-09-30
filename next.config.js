const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // Images configuration
  images: {
    domains: ['via.placeholder.com'],
  },

  // Disable SWC minification
  swcMinify: false,

  // Webpack configuration for minification
  webpack(config) {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
    ];
    return config;
  },
};
