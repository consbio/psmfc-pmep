// import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'

import { isDebug } from 'util/dom'
import { packedToObject } from 'util/data'
import { regions, estuaryTypes } from '../../../config/constants'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */
export const useData = () => {
  const data = useStaticQuery(graphql`
    query EstuariesDataQuery {
      allEstuariesJson {
        edges {
          node {
            id
            name
            estuaryType
            region
            state
            lat
            lon
            bounds
            acres
            nfhp2015
            SoKJoin
            NFHPJoin
            biotic
            species
          }
        }
      }
    }
  `).allEstuariesJson.edges.map(({ node }) => {
    // parse data types as needed
    const { id, region, estuaryType, species, biotic } = node

    return {
      ...node,

      // convert id back to integer
      id: parseInt(id, 10),

      // convert codes back to labels
      estuaryType: estuaryTypes[estuaryType],
      region: regions[region],

      // unpack species and biotic fields
      species: species ? packedToObject(species) : {},
      biotic: biotic ? packedToObject(biotic) : {},

      // speciesPresent: species.filter(spp => node[spp]), // any species not blank
      // // biotic_acres is a packed field:   <biotic_type>:<acres>|next, convert to an object of {type:acres, ...}
      // biotic: biotic_acres.split('|').reduce((result, part) => {
      //   if (part === '') return result
      //   part = part.split(':')
      //   result[part[0]] = parseFloat(part[1])
      //   return result
      // }, {}),
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
