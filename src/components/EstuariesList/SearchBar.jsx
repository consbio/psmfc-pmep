import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { FaSearch } from 'react-icons/fa'
import { Flex } from 'components/Grid'

import styled, { themeGet } from 'util/style'

export const Wrapper = styled.div`
  background-color: ${themeGet('colors.grey.200')};
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
`

export const SearchIcon = styled(FaSearch).attrs({
  size: '1.25rem',
})`
  color: ${themeGet('colors.grey.800')};
  margin-right: 0.5em;
`

export const Input = styled.input`
  width: 100%;
  font-size: 0.8rem;
  outline: none;
  padding: 0.1em 0.5em;
  color: ${themeGet('colors.grey.600')};
  border-radius: 0.25rem;
  background: #fff;
  border: none;
`

const SearchBar = ({ value, placeholder, onChange }) => {
  const handleChange = ({ target: { value: newValue } }) => {
    onChange(newValue)
  }

  return (
    <Wrapper>
      <Flex alignItems="center">
        <SearchIcon />
        <Input
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </Flex>
    </Wrapper>
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
