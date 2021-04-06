const config = require('./config/meta')
const theme = require('./src/theme')

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    sentryDSN: process.env.GATSBY_SENTRY_DSN,
    mapboxToken: process.env.GATSBY_MAPBOX_API_TOKEN,
  },
  // FIXME: update flags
  flags: { DEV_SSR: false, FAST_DEV: false },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {
        preset: theme,
        injectColorFlashScript: false,
      },
    },

    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_ANALYTICS_ID],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: `/?utm_source=a2hs`,
        background_color: config.manifest.backgroundColor,
        theme_color: config.manifest.themeColor,
        display: `standalone`,
        icon: `src/images/favicon-32x32.png`,
      },
    },
    // `gatsby-plugin-offline`,
  ],
}
