import React from 'react'
import { Container, Flex, Text, Heading } from 'theme-ui'
import { ExclamationTriangle } from '@emotion-icons/fa-solid'

const UnsupportedBrowser = () => (
  <Container sx={{ p: '2rem', flex: '1 1 auto', height: '100%', mt: '2rem' }}>
    <Heading as="h1" sx={{ fontSize: [4, 5, 6], lineHeight: 1 }}>
      <Flex sx={{ alignItems: 'center' }}>
        <ExclamationTriangle size="3rem" />
        <Text sx={{ ml: '1rem' }}>Unsupported Browser</Text>
      </Flex>
    </Heading>

    <Text sx={{ fontSize: [3, 4] }}>
      Unfortunately, you are using an unsupported browser or version.
      <br />
      <br />
      Please use a modern browser such as Google Chrome, Firefox, or Microsoft
      Edge, and upgrade to the latest version.
    </Text>
  </Container>
)

export default UnsupportedBrowser
