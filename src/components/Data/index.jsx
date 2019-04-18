// import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'

import { isDebug } from 'util/dom'
import { classify } from 'util/data'
import { sizeClasses } from '../../../config/constants'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */
export const useData = () => {
  const data = useStaticQuery(graphql`
    query EstuariesDataQuery {
      allEstuariesCsv {
        edges {
          node {
            id
            name
            type
            region
            minx
            miny
            maxx
            maxy
            acres
            state
            lon
            lat
            Rating_2015
          }
        }
      }
    }
  `).allEstuariesCsv.edges.map(({ node }) => {
    // parse data types
    // TODO: convert to using JSON for data, then we won't need to parse data
    const { id, lat, lon, minx, miny, maxx, maxy, acres, Rating_2015 } = node

    // TODO: classify in Python preprocessing

    return {
      ...node,
      id: parseInt(id, 10),
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      bounds: [
        parseFloat(minx),
        parseFloat(miny),
        parseFloat(maxx),
        parseFloat(maxy),
      ],
      acres: parseFloat(acres),
      sizeClass: classify(acres, sizeClasses),
      Rating_2015: parseInt(Rating_2015, 10),
    }
  })

  // Create index of data by ID
  const index = data.reduce((result, item) => {
    /* eslint-disable no-param-reassign */
    result[item.id] = item
    return result
  }, {})

  if (isDebug) {
    window.data = data
    window.index = index
  }

  return [fromJS(data), fromJS(index)]
}
