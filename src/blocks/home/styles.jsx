import { Box, Container } from 'components/Grid'
import styled, { themeGet } from 'util/style'

export const Section = styled(Container).attrs({
  py: '3rem',
  px: '1.5rem',
})`
  h4 {
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.1rem;
    color: ${themeGet('colors.grey.800')};
  }

  ul li {
    margin: 0;
  }
`

export const DarkSection = styled(Section)`
  background-color: rgba(0, 0, 0, 0.8);
  p,
  h1,
  h2,
  h3,
  h4,
  ul {
    color: #fff;
  }

  a {
    color: ${themeGet('colors.highlight.500')};
  }
`

export const Title = styled(Box).attrs({
  fontSize: ['1.5rem', '2.5rem'],
  mb: '0.5em',
})`
  font-weight: bold;
  line-height: 1.2;
`

export const InverseTitle = styled(Title)`
  color: #fff;
`
