const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

const isProduction = process.env.NODE_ENV === "production";
const withTM = require("next-transpile-modules")(["three"], { debug: true });
module.exports = (phase, { defaultConfig }) => {
  return {
    typescript: {
      ignoreBuildErrors: true,
    },
    productionBrowserSourceMaps: true,

    // assetPrefix : isProduction ? 'https://cdnjs.cloudflare.com' : ''
  };
};
