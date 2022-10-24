module.exports = {
  siteMetadata: {
    title: `fifty_ml`,
    siteUrl: `https://fiftyml.com`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://cms.fiftyml.com/graphql"
    }
  }, 
  "gatsby-plugin-image", 
  "gatsby-plugin-preact", 
  "gatsby-plugin-sharp", 
  "gatsby-transformer-sharp", 
  {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [
        "G-4RR287107Q",
      ],
      pluginConfig: {
        head: true
      },
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};
