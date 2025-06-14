const path = require('path');

const nextConfig = {
  reactStrictMode: true,  // best practice

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
    };
    return config;
  }
};

module.exports = nextConfig;
