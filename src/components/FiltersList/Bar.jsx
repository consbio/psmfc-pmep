import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Flex, Columns, Column } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'

const Wrapper = styled.div`
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 0.5rem;
  }
`

const Labels = styled(Columns).attrs({
  justifyContent: 'space-between',
})`
  color: ${({ active }) =>
    active ? themeGet('colors.highlight') : themeGet('colors.grey.700')};
  font-size: 0.8rem;
`

const IndicatorWrapper = styled(Flex).attrs({
  flexWrap: 'nowrap',
})`
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${themeGet('colors.grey.200')};
  border: 1px solid ${themeGet('colors.grey.200')};
  overflow: hidden;
`

const Indicator = styled.div`
  background-color: ${({ active }) =>
    active ? themeGet('colors.highlight') : themeGet('colors.primary.600')};
  flex-grow: ${({ width }) => width};
`

const Filler = styled.div`
  flex-grow: ${({ width }) => width};
`

const Bar = ({ isFiltered, label, count, total, onClick }) => {
  const position = count / total
  const remainder = 1 - position

  return (
    <Wrapper onClick={onClick}>
      <Labels active={isFiltered}>
        <Column>{label}</Column>
        <Column flex={0}>{formatNumber(count)}</Column>
      </Labels>
      <IndicatorWrapper>
        {position > 0 && <Indicator active={isFiltered} width={position} />}

        {remainder > 0 && <Filler width={remainder} />}
      </IndicatorWrapper>
    </Wrapper>
  )
}

Bar.propTypes = {
  isFiltered: PropTypes.bool, // true if filter is set on this bar
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

Bar.defaultProps = {
  isFiltered: false,
}

// TODO: optimize for changes to the callback
export default memo(Bar)
