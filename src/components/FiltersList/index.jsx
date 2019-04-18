import React from 'react'

import styled from 'util/style'
import Filter from './Filter'
import { filters as rawFilters } from '../../../config/filters'

const Wrapper = styled.div`
  padding: 0 1rem;
`

const index = () => {
  // filter out internal filters
  const filters = rawFilters.filter(({ internal }) => !internal)

  return (
    <Wrapper>
      {filters.map(filter => (
        <Filter key={filter.field} {...filter} />
      ))}
    </Wrapper>
  )
}

export default index
