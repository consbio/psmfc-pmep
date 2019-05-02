const GoogleAnalytics = require('react-ga')
const Sentry = require('@sentry/browser')
const config = require('./config/meta')

/**
 * Initialize Google Analytics and Sentry
 */
export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    GoogleAnalytics.initialize(config.googleAnalyticsId)

    Sentry.init({
      dsn: config.sentryDSN,
    })
    window.Sentry = Sentry
  }
}
