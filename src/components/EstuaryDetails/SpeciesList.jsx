import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import HelpText from 'components/elements/HelpText'
import styled, { themeGet } from 'util/style'
import { splitWords } from 'util/format'
import { sppEOLIDs } from '../../../config/constants'

const Header = styled(HelpText)`
  margin-bottom: 2rem;
`

const List = styled.ul`
  line-height: 1.2;
  li {
    margin: 0;

    & + li {
      margin-top: 0.5rem;
    }
  }
`

const Stage = styled.span`
  margin-left: 0.5em;
  font-size: 0.9rem;
  font-style: italic;
  color: ${themeGet('colors.grey.700')};
`

const Section = styled.section`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${themeGet('colors.grey.200')};
`

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
      <HelpText>
        This estuary was not inventoried for species in the <SoKLink />
      </HelpText>
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
      <HelpText>
        This estuary was inventoried for species in the <SoKLink />
      </HelpText>
    )
  } else {
    statusNote = (
      <HelpText>
        This estuary was inventoried as part of a larger estuary system or
        sub-basin containing this particular estuary for the <SoKLink />
      </HelpText>
    )
  }

  return (
    <>
      {entries.length > 0 ? (
        <>
          <Header>
            There are <b>{entries.length}</b> focal species that have been
            inventoried in this estuary. <b>{juvenileCount}</b> use the estuary
            mostly in their juvenile stage.
          </Header>
          <List>
            {entries.map(({ species, stage }) => (
              <li key={species}>
                <OutboundLink
                  from="/"
                  to={`http://eol.org/pages/${sppEOLIDs[species]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {splitWords(species)}
                  {stage === 'JP' && <Stage>(juvenile)</Stage>}
                </OutboundLink>
              </li>
            ))}
          </List>
        </>
      ) : (
        <HelpText>No focal species present</HelpText>
      )}

      <Section>{statusNote}</Section>
    </>
  )
}

SpeciesList.propTypes = {
  species: PropTypes.objectOf(PropTypes.string).isRequired,
  status: PropTypes.number.isRequired,
}

export default SpeciesList
