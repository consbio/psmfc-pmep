import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'

import { Flex } from 'components/Grid'
import styled, { theme } from 'util/style'

const Wrapper = styled.div``

const Title = styled.div`
  font-size: 1.25rem;
`

const expandoColor = theme.colors.grey[800]
const expandoSize = '1.5rem'

const CaretDown = styled(FaCaretDown).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  width: ${expandoSize};
  height: ${expandoSize};
`

const CaretRight = styled(FaCaretRight).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  width: ${expandoSize};
  height: ${expandoSize};
`

const Expando = ({ open, title, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(open)

  const toggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <Wrapper {...props}>
      <Flex onClick={toggle}>
        {isOpen ? <CaretDown /> : <CaretRight />}
        <Title>{title}</Title>
      </Flex>
      {isOpen ? children : null}
    </Wrapper>
  )
}

Expando.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

Expando.defaultProps = {
  open: false,
}

export default Expando
