import React from 'react'
import { Container, Box, Flex, Text } from 'theme-ui'
// import { FaExclamationTriangle } from 'react-icons/fa'
import { ExclamationTriangle } from '@emotion-icons/fa-solid'

// import styled, { themeGet } from 'util/style'

// const IconHeader = styled.h1`
//   text-align: center;
// `

// const StyledIcon = styled(FaExclamationTriangle)`
//   height: 10rem;
//   width: 10rem;
//   margin-right: 1rem;
//   color: #fff;
// `

// const WarningBox = styled(Box)`
//   margin-top: 2rem;
//   padding: 2rem;
//   background-color: ${themeGet('colors.primary.900')};

//   h1 {
//     color: #fff;
//   }
// `

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
