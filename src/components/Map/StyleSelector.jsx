import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import styled, { css, themeGet } from 'util/style'

import LightIcon from 'images/light-v9.png'
import StreetsIcon from 'images/streets-v11.png'
import SatelliteIcon from 'images/satellite-streets-v11.jpg'

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

  width: 64px;
  height: 64px;
  border-radius: 64px;

  &:not(:first-child) {
    margin-left: 0.25rem;
  }
`

const icons = {
  'light-v9': LightIcon,
  'satellite-streets-v11': SatelliteIcon,
  'streets-v11': StreetsIcon,
}

const StyleSelector = ({ styles, onChange }) => {
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
          src={icons[nextBasemap]}
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
            src={icons[nextBasemap]}
            onClick={() => handleBasemapClick(nextBasemap)}
          />
          {styles
            .filter(style => style !== nextBasemap)
            .map(styleID => (
              <Basemap
                key={styleID}
                isActive={styleID === basemap}
                src={icons[styleID]}
                onClick={() => handleBasemapClick(styleID)}
              />
            ))}
        </>
      ) : (
        <Basemap src={icons[nextBasemap]} onClick={toggleOpen} />
      )}
    </Wrapper>
  )
}

StyleSelector.propTypes = {
  // list of mapbox style IDs - corresponding images must be loaded here
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

// don't rerender based on container
export default memo(StyleSelector, () => true)
