/** @type {import('next').NextConfig} */
const path = require("path");
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
      {
        protocol: "http",
        hostname: "app.sunvalley.vip",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "index.scss";`,
  },
  env: {
    primaryColor: "rgb(99,102,241)",
  },
  i18n,
};

module.exports = nextConfig;
