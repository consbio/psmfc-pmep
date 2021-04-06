import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'theme-ui'

import { formatNumber } from 'util/format'

const Bar = ({ isFiltered, isExcluded, label, count, total, onClick }) => {
  const position = count / total
  const remainder = 1 - position

  return (
    <Box
      onClick={onClick}
      isExcluded={isExcluded}
      sx={{
        cursor: 'pointer',
        lineHeight: 1,
        mb: '0.75rem',
        transition: 'opacity 300ms',
        opacity: isExcluded ? 0.25 : 1,
        '&:hover': {
          opacity: isExcluded ? 0.5 : 1,
        },
      }}
    >
      <Flex
        sx={{
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: isFiltered ? 'highlight.500' : 'grey.700',
        }}
      >
        <Box>{label}</Box>
        <Box flex={0}>{formatNumber(count)}</Box>
      </Flex>

      <Flex
        sx={{
          mt: '0.25rem',
          flexWrap: 'nowrap',
          height: '0.5rem',
          borderRadius: '1rem',
          bg: 'grey.200',
          border: '1px solid',
          borderColor: 'grey.200',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: isFiltered ? 'highlight.500' : 'primary.500',
            transition: 'flex-grow 300ms',
          }}
          style={{
            flexGrow: `${position}`,
          }}
        />
        <Box
          style={{ flexGrow: `${remainder}`, transition: 'flex-grow 300ms' }}
        />
      </Flex>
    </Box>
  )
}

Bar.propTypes = {
  isFiltered: PropTypes.bool, // true if filter is set on this bar
  isExcluded: PropTypes.bool, // true if filters are set on others but not this one
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

Bar.defaultProps = {
  isFiltered: false,
  isExcluded: false,
}

// TODO: optimize for changes to the callback
export default memo(Bar)
