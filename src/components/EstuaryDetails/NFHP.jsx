import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import HelpText from 'components/elements/HelpText'
import ThreatChart from './ThreatChart'

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

const NFHP = ({ level, status }) => {
  console.log(status)
  let StatusNote = ''

  switch (status) {
    case 1: {
      StatusNote = (
        <HelpText>
          This estuary was assessed as part of the <NFHPLink />.
        </HelpText>
      )
      break
    }
    case 2: {
      StatusNote = (
        <HelpText>
          This estuary was assessed as part of a larger estuary system or
          sub-basin within the <NFHPLink />. Note: this assessment may not
          accurately represent this specific estuary.
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
