import { useEffect, useState } from 'react'

/**
 * Function that is triggered on mount of component in UI.  Useful for handling
 * client-only components.
 * From: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}
