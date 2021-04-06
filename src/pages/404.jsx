import React from 'react'
import { Container, Text, Heading } from 'theme-ui'

import { Link } from 'components/Link'
import Layout from 'components/Layout'

const NotFoundPage = () => (
  <Layout title="404: Not found">
    <Container sx={{ p: '2rem', minHeight: '50vh', mt: '2rem' }}>
      <Heading as="h1" sx={{ fontSize: [4, 5, 8] }}>
        PAGE NOT FOUND
      </Heading>
      <Text sx={{ fontSize: [3, 5] }}>
        You appear to be lost...
        <br />
        <br />
        Try going <Link to="/">Home</Link>
      </Text>
    </Container>
  </Layout>
)

export default NotFoundPage
