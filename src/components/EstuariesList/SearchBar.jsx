import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Input } from 'theme-ui'
import { TimesCircle } from '@emotion-icons/fa-regular'
import { Search } from '@emotion-icons/fa-solid'

const SearchBar = ({ value, placeholder, onChange }) => {
  const handleChange = ({ target: { value: newValue } }) => {
    onChange(newValue)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <Box
      sx={{
        flex: '0 0 auto',
        bg: 'grey.200',
        py: '0.5rem',
        px: '1rem',
        mt: '0.25rem',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          flexWrap: 'nowrap',
          py: '0.25rem',
          px: '0.5rem',
          borderRadius: '0.25rem',
          bg: '#FFF',
          border: 'none',
          color: 'grey.600',
        }}
      >
        <Search size="1rem" />
        <Input
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          sx={{
            flex: '1 1 auto',

            fontSize: '0.8rem',
            outline: 'none',
            border: 'none',
            py: '0.1em',
            px: '0.5em',
            color: value ? 'grey.800' : 'grey.600',
            '&:active,&:focus': {
              color: 'grey.800',
            },
            '&::placeholder': {
              color: 'grey.600',
            },
          }}
        />
        <Box
          onClick={handleClear}
          sx={{
            cursor: 'pointer',
            visibility: value ? 'visible' : 'hidden',
            '&:hover': {
              color: 'grey.800',
            },
          }}
        >
          <TimesCircle size="1rem" />
        </Box>
      </Flex>
    </Box>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  placeholder: '',
}

// only rerender on value change
export default memo(
  SearchBar,
  ({ value: prevValue }, { value: nextValue }) => prevValue === nextValue
)
