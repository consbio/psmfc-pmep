/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

/**
 * Enable absolute imports with `/src` as root.
 *
 * See: https://github.com/alampros/gatsby-plugin-resolve-src/issues/4
 */
exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
      ],
    }
  }

  actions.setWebpackConfig(config)
}
