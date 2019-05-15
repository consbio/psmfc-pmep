import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import BaseHelpText from 'components/elements/HelpText'
import styled from 'util/style'
import ThreatChart from './ThreatChart'

const HelpText = styled(BaseHelpText)`
  font-size: 0.8rem;
`

const NFHPLink = () => (
  <OutboundLink
    from="/"
    to="http://assessment.fishhabitat.org/"
    target="_blank"
    rel="noopener noreferrer"
  >
    2015 National Fish Habitat Assessment
  </OutboundLink>
)

const NFHAPAbout =
  'This assessment used a cumulative disturbance index to estimate risk of fish habitat degradation in estuarine habitats. The index used twenty-eight variables across four types of disturbance, which included (1) land use and land cover change, (2) alteration of river flows, (3) pollution sources, and (4) estuary eutrophication.'

const NFHP = ({ level, status }) => {
  let StatusNote = ''

  switch (status) {
    case 1: {
      StatusNote = (
        <HelpText>
          This estuary was assessed as part of the <NFHPLink />. {NFHAPAbout}
        </HelpText>
      )
      break
    }
    case 2: {
      StatusNote = (
        <HelpText>
          This estuary was assessed as part of a larger estuary system or
          sub-basin within the <NFHPLink />. {NFHAPAbout}
          <br />
          <br />
          Note: this assessment may not accurately represent this specific
          estuary.
        </HelpText>
      )
      break
    }
    default: // status === 3 or status === 999
    {
      StatusNote = (
        <HelpText>
          This estuary was not assessed as part of the <NFHPLink />.
        </HelpText>
      )
      break
    }
  }

  if (level === 5) {
    StatusNote = (
      <HelpText>
        This estuary was not assessed as part of the <NFHPLink />.
      </HelpText>
    )
  }

  return (
    <>
      <ThreatChart level={level} />
      {StatusNote}
    </>
  )
}

NFHP.propTypes = {
  level: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
}

export default NFHP
