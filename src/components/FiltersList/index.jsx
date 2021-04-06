import React, { useContext } from 'react'
import { Flex, Box, Text, Button } from 'theme-ui'
import { TimesCircle } from '@emotion-icons/fa-regular'

import { Context as Crossfilter, RESET_FILTERS } from 'components/Crossfilter'
import Filter from './Filter'
import { filters as rawFilters } from '../../../config/filters'

// filter out internal filters
const filters = rawFilters.filter(({ internal }) => !internal)

const index = () => {
  const { state, dispatch } = useContext(Crossfilter)

  const hasFilters =
    filters.filter(({ field }) => {
      const curFilter = state.get('filters').get(field)
      return curFilter && !curFilter.isEmpty()
    }).length > 0

  const handleReset = () => {
    dispatch({
      type: RESET_FILTERS,
      payload: {
        fields: filters.map(({ field }) => field),
      },
    })
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        flex: '1 1 auto',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: '0 0 auto',
          pb: '0.5rem',
          px: '1rem',
          borderBottom: '1px solid',
          borderBottomColor: 'grey.200',
        }}
      >
        <Box>
          <Text
            sx={{
              fontSize: '0.8rem',
              color: 'grey.600',
              lineHeight: 1,
            }}
          >
            {state.get('filteredCount')} estuaries currently visible in the
            current extent
          </Text>
        </Box>
        {hasFilters && (
          <Button
            variant="primary"
            onClick={handleReset}
            sx={{
              flex: '0 0 auto',
              mt: '0.5rem',
              fontSize: '0.8rem',
            }}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <TimesCircle size="1.5em" style={{ marginRight: '0.25rem' }} />
              <Box>reset all filters</Box>
            </Flex>
          </Button>
        )}
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          height: '100%',
          overflow: 'auto',
          pr: '1rem',
          pb: '2rem',
        }}
      >
        {filters.map((filter) => (
          <Filter key={filter.field} {...filter} />
        ))}
      </Box>
    </Flex>
  )
}

export default index
