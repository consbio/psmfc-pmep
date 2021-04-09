import React from 'react'
import PropTypes from 'prop-types'

import { useHasMounted } from 'util/hooks'

/**
 * Component to wrap components that can only render in the client, like the Map.
 */
const ClientOnly = ({ children }) => {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

ClientOnly.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClientOnly
