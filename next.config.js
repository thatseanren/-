const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  // assetPrefix : isProduction ? 'https://cdnjs.cloudflare.com' : ''
};

