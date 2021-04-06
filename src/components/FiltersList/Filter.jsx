import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Map, Set } from 'immutable'
import { Flex, Box, Text } from 'theme-ui'
import { TimesCircle } from '@emotion-icons/fa-regular'
import { CaretDown, CaretRight } from '@emotion-icons/fa-solid'

import { OutboundLink } from 'components/Link'
import { Context as Crossfilter, SET_FILTER } from 'components/Crossfilter'

import Bar from './Bar'

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
    setIsOpen((prev) => !prev)
  }

  const handleFilterClick = (value) => {
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

  const Caret = isOpen ? CaretDown : CaretRight

  return (
    <Box
      sx={{
        pt: '0.5rem',
        '&:not(:first-of-type)': {
          mt: '0.5rem',
          borderTop: '1px solid',
          borderTopColor: 'grey.200',
        },
      }}
    >
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Flex
          onClick={toggle}
          sx={{ cursor: 'pointer', flex: '1 1 auto', alignItems: 'center' }}
        >
          <Box sx={{ color: 'grey.800', mr: '0.25rem' }}>
            <Caret size="1em" />
          </Box>
          <Text>{title}</Text>
        </Flex>
        <Box
          sx={{
            color: 'highlight.500',
            cursor: 'pointer',
          }}
          style={{ visibility: filterValues.size > 0 ? 'visible' : 'hidden' }}
          onClick={handleReset}
          title="reset filter"
        >
          <TimesCircle size="1em" />
        </Box>
      </Flex>

      {isOpen && (
        <Box sx={{ m: '0.5rem 0 0 1rem' }}>
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
            <Text variant="help" sx={{ mb: '1rem' }}>
              {description}
              {moreInfoURL && (
                <>
                  {' '}
                  <OutboundLink from="/compare" to={moreInfoURL}>
                    Read more...
                  </OutboundLink>
                </>
              )}
            </Text>
          )}
        </Box>
      )}
    </Box>
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
