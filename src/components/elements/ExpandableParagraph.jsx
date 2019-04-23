import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled, { themeGet } from 'util/style'

const Wrapper = styled.div`
  cursor: pointer;
  line-height: 1.2;
`

const Snippet = styled.p``

const PseudoLink = styled.span`
  color: ${themeGet('colors.primary.500')};

  &:hover {
    text-decoration: underline;
  }
`

const ExpandableParagraph = ({ snippet, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }
  return (
    <Wrapper onClick={toggle} {...props}>
      {isOpen ? (
        <p>
          {children}
          <br />
          <PseudoLink>Show less...</PseudoLink>
        </p>
      ) : (
        <Snippet>
          {snippet} <PseudoLink>Show more...</PseudoLink>
        </Snippet>
      )}
    </Wrapper>
  )
}

ExpandableParagraph.propTypes = {
  snippet: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
}

export default ExpandableParagraph
