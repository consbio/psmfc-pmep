import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Link } from 'components/Link'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import { Container } from 'components/Grid'
import { BackgroundImage } from 'components/Image'
import styled, { themeGet } from 'util/style'

const Content = styled(Container)`
  min-height: 20rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;

  a {
    color: #fff;
  }
`

const NotFoundPage = ({ data: { headerImage } }) => (
  <Layout>
    <SEO title="404: Not found" />

    <BackgroundImage
      image={headerImage.childImageSharp.gatsbyImageData}
      credits={{
        author: 'stokes rx',
        url: 'https://www.flickr.com/photos/stokesrx/6307999051',
      }}
      style={{
        height: '100%',
      }}
    >
      <Content p="2rem">
        <h1>PAGE NOT FOUND</h1>
        <h2>You appear to be lost...</h2>
        <h3>
          Try going <Link to="/">Home</Link>
        </h3>
      </Content>
    </BackgroundImage>
  </Layout>
)

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    headerImage: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query NotFoundPageQuery {
    headerImage: file(relativePath: { eq: "6307999051_5d2c4d7ce4_o.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          formats: [AUTO, WEBP]
          placeholder: BLURRED
        )
      }
    }
  }
`

export default NotFoundPage
