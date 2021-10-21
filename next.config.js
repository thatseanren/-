const isProduction = process.env.NODE_ENV === "production";
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  console.log(phase)
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    //if start command is npm run dev
    return {
      typescript: {
        ignoreBuildErrors: true,
      },
      productionBrowserSourceMaps: true,
      // assetPrefix : isProduction ? 'https://cdnjs.cloudflare.com' : ''
      serverRuntimeConfig: {
        annotation: "http://localhost:555/",
      },
      // webpack: (config) =>{
      //   "sideEffects": ["./src/some-side-effectful-file.js"]
      // }
    };
  }
  return {
    typescript: {
      ignoreBuildErrors: true,
    },
    productionBrowserSourceMaps: true,
    // assetPrefix : isProduction ? 'https://cdnjs.cloudflare.com' : ''
    serverRuntimeConfig: {
      annotation: "http://10.78.4.88:555/",
    },
  
  };
};
