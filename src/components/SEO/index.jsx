import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import favicon32 from 'images/favicon-32x32.png'
import favicon16 from 'images/favicon-16x16.png'
import config from '../../../config/meta'

function SEO({ description, lang, meta, title }) {
  const metaDescription = description || config.siteDescription
  const schemaOrg = [
    {
      '@context': `http://schema.org`,
      '@type': `WebSite`,
      url: config.siteUrl,
      name: title,
      description: config.siteDescription,
      alternateName: '',
      author: {
        '@type': `Person`,
        name: config.schema.author,
      },
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s - ${config.siteTitle}`}
      link={[
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: `${favicon32}`,
          sizes: '32x32',
        },
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: `${favicon16}`,
          sizes: '16x16',
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: config.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  )
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
}

SEO.defaultProps = {
  description: config.siteDescription,
  lang: `en`,
  meta: [],
}

export default SEO
