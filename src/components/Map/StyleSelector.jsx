import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import styled, { css, themeGet } from 'util/style'

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 24px;
  z-index: 999;
`

const Basemap = styled.img`
  box-sizing: border-box;
  border: 2px solid
    ${({ isActive }) => (isActive ? themeGet('colors.highlight.500') : '#fff')};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  margin: 0;

  ${({ size }) => css`
    width: ${size};
    height: ${size};
    border-radius: ${size};
  `}

  &:not(:first-child) {
    margin-left: 0.25rem;
  }
`

const getSrc = ({ styleID, z, x, y, token }) =>
  `https://api.mapbox.com/styles/v1/mapbox/${styleID}/tiles/256/${z}/${x}/${y}?access_token=${token}`

const StyleSelector = ({ token, styles, tile, size, onChange }) => {
  const [basemap, setBasemap] = useState(styles[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleBasemapClick = newBasemap => {
    setIsOpen(false)

    if (newBasemap === basemap) return

    setBasemap(newBasemap)
    onChange(newBasemap)
  }

  const toggleOpen = () => {
    setIsOpen(true)
  }

  const toggleClosed = () => {
    setIsOpen(false)
  }

  // if there are only 2 options, render as a toggle
  if (styles.length === 2) {
    const nextBasemap = basemap === styles[0] ? styles[1] : styles[0]

    return (
      <Wrapper>
        <Basemap
          size={size}
          src={getSrc({ styleID: nextBasemap, token, ...tile })}
          onClick={() => handleBasemapClick(nextBasemap)}
        />
      </Wrapper>
    )
  }

  const nextBasemap = styles.filter(style => style !== basemap)[0]

  return (
    <Wrapper onMouseEnter={toggleOpen} onMouseLeave={toggleClosed}>
      {isOpen ? (
        <>
          <Basemap
            size={size}
            src={getSrc({ styleID: nextBasemap, token, ...tile })}
            onClick={() => handleBasemapClick(nextBasemap)}
          />
          {styles
            .filter(style => style !== nextBasemap)
            .map(styleID => (
              <Basemap
                key={styleID}
                isActive={styleID === basemap}
                size={size}
                src={getSrc({ styleID, token, ...tile })}
                onClick={() => handleBasemapClick(styleID)}
              />
            ))}
        </>
      ) : (
        <Basemap
          size={size}
          src={getSrc({ styleID: nextBasemap, token, ...tile })}
          onClick={toggleOpen}
        />
      )}
    </Wrapper>
  )
}

StyleSelector.propTypes = {
  token: PropTypes.string.isRequired,
  // list of mapbox style IDs
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  tile: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }),
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

StyleSelector.defaultProps = {
  tile: {
    x: 0,
    y: 0,
    z: 0,
  },
  size: '64px',
}

// don't rerender based on container
export default memo(StyleSelector, () => true)
