import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'

import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import styled, { themeGet, theme } from 'util/style'
import { formatNumber } from 'util/format'
import { bioticInfo } from '../../../config/constants'

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

const Header = styled(Flex).attrs({
  justifyContent: 'space-between',
})`
  cursor: pointer;
`

const Title = styled(Flex).attrs({ alignItems: 'center', flex: 1 })`
  cursor: pointer;
`

const Bar = styled.div`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width * 100}%;
  height: 1.25rem;
  line-height: 1;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0.25rem 1rem 0;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
`

const Acres = styled.div`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${themeGet('colors.grey.700')};
  text-align: right;
`

const Content = styled.div`
  margin-left: 1.5rem;
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

const BioticListItem = ({ type, acres, maxAcres }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen)

  const { label, color, description } = bioticInfo[type]
  const position = acres / maxAcres

  return (
    <Wrapper>
      <Header onClick={toggle}>
        <Title>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>{label}</div>
        </Title>
        <Acres>{formatNumber(acres)} acres</Acres>
      </Header>
      <Content>
        {position > 0 && (
          <Bar color={color} width={position} onClick={toggle} />
        )}
        {isOpen && <HelpText>{description}</HelpText>}
      </Content>
    </Wrapper>
  )
}

BioticListItem.propTypes = {
  type: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  maxAcres: PropTypes.number.isRequired,
}

export default BioticListItem
