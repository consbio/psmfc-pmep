import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import styled, { css } from 'util/style'

// TODO: if there are only 2 styles, make this a toggle
// tile URL: https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/0/0/0?access_token=pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 24px;
  z-index: 999;
`

const Basemap = styled.img`
  border: 2px solid #fff;
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
  const [basemapIdx, setBasemapIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const handleBasemapClick = idx => {
    if (idx === basemapIdx) return
    // TODO:
    setBasemapIdx(idx)
    onChange(styles[idx])
  }

  const toggleOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  // if there are only 2 options, render as a toggle
  if (styles.length === 2) {
    const nextIdx = basemapIdx === 0 ? 1 : 0
    return (
      <Wrapper>
        <Basemap
          size={size}
          src={getSrc({ styleID: styles[nextIdx], token, ...tile })}
          onClick={() => handleBasemapClick(nextIdx)}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper onMouseEnter={() => toggleOpen} onMouseLeave={() => toggleOpen}>
      {isOpen ? (
        <Flex alignItems="center">
          <Basemap
            size={size}
            src={getSrc({ styleID: styles[basemapIdx], token, ...tile })}
            onClick={() => toggleOpen}
          />
          {styles
            .filter((style, i) => i !== basemapIdx)
            .map((style, i) => (
              <Basemap
                src={getSrc({ styleID: style, token, ...tile })}
                onClick={() => handleBasemapClick(i)}
              />
            ))}
        </Flex>
      ) : (
        <Basemap
          size={size}
          src={getSrc({ styleID: styles[basemapIdx], token, ...tile })}
          onClick={() => toggleOpen}
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
