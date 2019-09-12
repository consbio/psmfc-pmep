import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Map, Set } from 'immutable'
import { FaRegTimesCircle, FaCaretDown, FaCaretRight } from 'react-icons/fa'

import HelpText from 'components/elements/HelpText'
import { OutboundLink } from 'components/Link'
import { Context as Crossfilter, SET_FILTER } from 'components/Crossfilter'
import { Flex } from 'components/Grid'

import styled, { theme, themeGet } from 'util/style'
import Bar from './Bar'

const Wrapper = styled.div`
  padding-top: 0.25rem;

  &:not(:first-child) {
    border-top: 1px solid ${themeGet('colors.grey.200')};
  }
`

const Header = styled(Flex).attrs({
  justifyContent: 'space-between',
})``

const Title = styled(Flex).attrs({ alignItems: 'center', flex: 1 })`
  cursor: pointer;
`

const ResetIcon = styled(FaRegTimesCircle).attrs({
  size: '1rem',
})`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  visibility: ${({ visible }) => visible};
  cursor: pointer;
  color: ${themeGet('colors.highlight.500')};
`

const expandoColor = theme.colors.grey[800]
const expandoSize = '1.5rem'

const CaretDown = styled(FaCaretDown).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`

const CaretRight = styled(FaCaretRight).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`

const Bars = styled.div`
  padding: 0.5rem 0 0 1rem;
`

const Filter = ({
  field,
  title,
  description,
  moreInfoURL,
  values,
  labels,
  isOpen: initIsOpen,
}) => {
  const [isOpen, setIsOpen] = useState(initIsOpen)
  const { state, dispatch } = useContext(Crossfilter)

  const filterValues = state.get('filters').get(field, Set())
  const counts = state.get('dimensionCounts').get(field, Map())
  const total = state.get('total')

  const toggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleFilterClick = value => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field,
        filterValue: filterValues.has(value)
          ? filterValues.delete(value)
          : filterValues.add(value),
      },
    })
  }

  const handleReset = () => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field,
        filterValue: filterValues.clear(),
      },
    })
  }

  return (
    <Wrapper>
      <Header>
        <Title onClick={toggle}>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>{title}</div>
        </Title>
        {
          <ResetIcon
            onClick={handleReset}
            visible={filterValues.size > 0 ? 'visible' : 'hidden'}
          />
        }
      </Header>

      {isOpen && (
        <Bars>
          {values.map((value, idx) => (
            <Bar
              key={value}
              isFiltered={filterValues.has(value)}
              isExcluded={!filterValues.isEmpty() && !filterValues.has(value)}
              label={labels && labels[idx] ? labels[idx] : value}
              count={counts.get(value, 0)}
              total={total}
              onClick={() => handleFilterClick(value)}
            />
          ))}

          {description && (
            <HelpText fontSize="smaller" mb="1rem">
              {description}
              {moreInfoURL && (
                <>
                  {' '}
                  <OutboundLink from="/compare" to={moreInfoURL}>
                    Read more...
                  </OutboundLink>
                </>
              )}
            </HelpText>
          )}
        </Bars>
      )}
    </Wrapper>
  )
}

Filter.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  moreInfoURL: PropTypes.string,
  values: PropTypes.array.isRequired,
  labels: PropTypes.array,
  isOpen: PropTypes.bool,
}

Filter.defaultProps = {
  labels: null,
  isOpen: false,
  description: null,
  moreInfoURL: null,
}

export default Filter
