import React from 'react'
import { Container, Box, Text } from 'theme-ui'
import { ExclamationTriangle } from '@emotion-icons/fa-solid'

const UnsupportedBrowser = () => (
  <Container>
    <Box
      sx={{
        mt: '2rem',
        p: '2rem',
        bg: 'primary.900',
        color: '#FFF',
      }}
    >
      <Box>
        <ExclamationTriangle size="3rem" />
      </Box>
      <Text sx={{ fontSize: '3rem' }}>
        Unfortunately, you are using an unsupported version of Internet
        Explorer.
        <br />
        <br />
        Please use a modern browser such as Google Chrome, Firefox, or Microsoft
        Edge.
      </Text>
    </Box>
  </Container>
)

export default UnsupportedBrowser
