module.exports = {
  siteMetadata: {
    title: "mix-demo-client",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    }
  ],
  flags: {
    DEV_SSR: false
  }
};
