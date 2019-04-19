// import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'

import { isDebug } from 'util/dom'
import { classify } from 'util/data'
import { sizeClasses, species } from '../../../config/constants'

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

            DungenessCrab
            BayShrimp
            GreenSturgeon
            LeopardShark
            BatRay
            CaliforniaHalibut
            EnglishSole
            StarryFlounder
            ShinerPerch
            StaghornSculpin
            PacificHerring
            BrownRockfish
            Steelhead
            CohoSalmon
            ChinookSalmon
            SoKJoin
            NFHPJoin
            Rating_2015
            biotic_acres
          }
        }
      }
    }
  `).allEstuariesCsv.edges.map(({ node }) => {
    // parse data types
    const {
      id,
      lat,
      lon,
      minx,
      miny,
      maxx,
      maxy,
      acres,
      Rating_2015,
      SoKJoin,
      NFHPJoin,
      biotic_acres,
    } = node

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
      Rating_2015: parseInt(Rating_2015, 10),
      SoKJoin: parseInt(SoKJoin, 10),
      NFHPJoin: parseInt(NFHPJoin, 10),
      speciesPresent: species.filter(spp => node[spp]), // any species not blank
      // biotic_acres is a packed field:   <biotic_type>:<acres>|next, convert to an object of {type:acres, ...}
      biotic: biotic_acres.split('|').reduce((result, part) => {
        if (part === '') return result
        part = part.split(':')
        result[part[0]] = parseFloat(part[1])
        return result
      }, {}),
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
