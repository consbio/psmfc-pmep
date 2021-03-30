const path = require('path-browserify')
/**
 * Enable absolute imports with `/src` as root.
 * See: https://github.com/alampros/gatsby-plugin-resolve-src/issues/4
 */
exports.onCreateWebpackConfig = ({ actions, stage, loaders, plugins }) => {
  const config = {
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
        // process: require.resolve('process/browser'),
      },
      fallback: {
        fs: false,
        // process: false,
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [plugins.provide({ process: 'process/browser' })],
    // FIXME: enable or remove?
    // per https://github.com/gatsbyjs/gatsby/issues/564
    // node: {
    //   fs: 'empty',
    // },
  }

  // when building HTML, window is not defined, so mapbox-gl causes the build to blow up
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
