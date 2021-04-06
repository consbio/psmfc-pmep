import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'theme-ui'

import { OutboundLink } from 'components/Link'
import List from 'components/elements/List'
import { splitWords } from 'util/format'
import { sppEOLIDs } from '../../../config/constants'

const SoKLink = () => (
  <OutboundLink
    from="/"
    to="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    2014 State of the Knowledge Report.
  </OutboundLink>
)

const SpeciesList = ({ species: data, status }) => {
  // not inventoried
  if (status === 3) {
    return (
      <Text variant="help">
        This estuary was not inventoried for species in the <SoKLink />
      </Text>
    )
  }

  const entries = Object.entries(data).map(([species, stage]) => ({
    species,
    stage,
  }))

  // sort by name
  entries.sort((a, b) => (a.species > b.species ? 1 : -1))

  const juvenileCount = entries.filter(({ stage }) => stage === 'JP').length

  let statusNote = null

  if (status === 1) {
    statusNote = (
      <Text variant="help">
        This estuary was inventoried for species in the <SoKLink />
      </Text>
    )
  } else {
    statusNote = (
      <Text variant="help">
        This estuary was inventoried as part of a larger estuary system or
        sub-basin containing this particular estuary for the <SoKLink />
      </Text>
    )
  }

  return (
    <>
      {entries.length > 0 ? (
        <>
          <Text sx={{ color: 'grey.900' }}>
            There are <b>{entries.length}</b> focal species that have been
            inventoried in this estuary. <b>{juvenileCount}</b> use the estuary
            mostly in their juvenile stage.
          </Text>
          <List
            sx={{
              mt: '0.5rem',
              mb: '1rem',
              '& li + li': {
                mt: '0.25rem',
              },
            }}
          >
            {entries.map(({ species, stage }) => (
              <li key={species}>
                <OutboundLink
                  from="/"
                  to={`http://eol.org/pages/${sppEOLIDs[species]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {splitWords(species)}
                  {stage === 'JP' && (
                    <Text
                      as="span"
                      sx={{
                        display: 'inline-block',
                        ml: '0.5rem',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        color: 'grey.700',
                      }}
                    >
                      (juvenile)
                    </Text>
                  )}
                </OutboundLink>
              </li>
            ))}
          </List>
        </>
      ) : (
        <Text variant="help">No focal species present</Text>
      )}

      <Box variant="layout.block">{statusNote}</Box>
    </>
  )
}

SpeciesList.propTypes = {
  species: PropTypes.objectOf(PropTypes.string).isRequired,
  status: PropTypes.number.isRequired,
}

export default SpeciesList
