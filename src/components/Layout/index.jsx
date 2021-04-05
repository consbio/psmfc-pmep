import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, ThemeProvider } from 'theme-ui'
// TODO: remove ThemeProvider, already provided by gatsby plugin

import theme from 'theme'

import SEO from 'components/SEO'
import { isUnsupported } from 'util/dom'
import UnsupportedBrowser from './UnsupportedBrowser'

import Header from './Header'
import Footer from './Footer'

import config from '../../../config/meta'

const Layout = ({ title, children }) => (
  <ThemeProvider theme={theme}>
    <Flex sx={{ height: '100%', flexDirection: 'column' }}>
      <SEO title={title} />

      <Header siteTitle={config.siteTitle} />

      {isUnsupported ? (
        <UnsupportedBrowser />
      ) : (
        <Box sx={{ height: '100%', flex: '1 1 auto', overflowY: 'auto' }}>
          {children}
        </Box>
      )}
      <Footer />
    </Flex>
  </ThemeProvider>
)

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  title: config.siteTitle,
}

export default Layout
