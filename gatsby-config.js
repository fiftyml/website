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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'fifty_ml',
        short_name: 'fifty_ml',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        icon: 'src/images/icon.png',
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
