// import React from 'react';
import React, { Component } from 'react'
import { format } from 'd3-format'

import HorizontalBarchart from './barchart/HorizontalBarchart'
import { stateNames, bioticInfo, nfhpLabels, sppEOLIDs } from '../constants'
import { splitWords } from '../utils'

// Need tooltips or other things to help people understand
// Show placeholder if there are no species or biotic components

const acresFormatter = d => {
  // if (d < 1) return '< 1 acre';
  // if (d < 1.05) return '1 acre';
  if (d < 0.5) return '< 0.5 acre'
  if (d < 1.05) return `${Math.round(d * 10) / 10} acre` // 1 decimal place
  if (d < 5) return `${Math.round(d * 10) / 10} acres` // 1 decimal place
  return `${format(',')(Math.round(d))} acres`
}

class EstuaryDetails extends Component {
  componentDidMount() {
    if (this.node) {
      this.node.scrollIntoView(true)
    }
  }

  renderSpeciesList = () => {
    const { id, spps, lifeStages, SoKJoin } = this.props

    if (SoKJoin === 3) {
      return (
        <p className="has-text-grey is-size-7">
          This estuary was not inventoried for species in the &nbsp;
          <a
            href="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2014 State of the Knowledge Report.
          </a>
          .
        </p>
      )
    }

    if (spps.length === 0) {
      return <i className="has-text-grey">No focal species present</i>
    }

    let SoKNote = null
    switch (SoKJoin) {
      case 1: {
        SoKNote = (
          <p className="has-text-grey is-size-7">
            This estuary was inventoried for species in the &nbsp;
            <a
              href="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              2014 State of the Knowledge Report
            </a>
            .
          </p>
        )
        break
      }
      case 2: {
        SoKNote = (
          <p className="has-text-grey is-size-7">
            Note: species were inventoried within a larger estuary system or
            sub-basin containing this particular estuary for the &nbsp;
            <a
              href="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              2014 State of the Knowledge Report
            </a>
            . These species may or may not be present in this estuary.
          </p>
        )
        break
      }
      default:
        break
    }

    return (
      <div>
        <ul>
          {spps.map(spp => (
            <li key={id + spp}>
              <a
                href={`http://eol.org/pages/${sppEOLIDs[spp]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {splitWords(spp)}
              </a>
              {lifeStages[spp] === 'JP' ? (
                <i className="has-text-grey" style={{ marginLeft: 10 }}>
                  (juvenile)
                </i>
              ) : null}
            </li>
          ))}
        </ul>
        {SoKNote}
      </div>
    )
  }

  renderNFHPList = () => {
    const { NFHPJoin, Rating_2015 } = this.props

    if (NFHPJoin === 3 || NFHPJoin === 999) {
      return (
        <p className="has-text-grey is-size-7">
          This estuary was not assessed as part of the&nbsp;
          <a
            href="http://assessment.fishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            National Fish Habitat Assessment
          </a>
          &nbsp;in 2015 .
        </p>
      )
    }

    let NFHPNote = null
    switch (NFHPJoin) {
      case 1: {
        NFHPNote = (
          <p className="has-text-grey is-size-7">
            This estuary was assessed as part of the&nbsp;
            <a
              href="http://assessment.fishhabitat.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Fish Habitat Assessment
            </a>
            .
          </p>
        )
        break
      }

      case 2: {
        NFHPNote = (
          <p className="has-text-grey is-size-7">
            Note: the&nbsp;
            <a
              href="http://assessment.fishhabitat.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Fish Habitat Assessment
            </a>
            &nbsp; assessed risk of degradation of fish habitat within a larger
            estuary system or sub-basin containing this particular estuary. This
            risk may not accurately represent this estuary.
          </p>
        )
        break
      }
      default:
        NFHPNote = null
        break
    }

    return (
      <div>
        <ul>
          <li>2015: {nfhpLabels[Rating_2015]}</li>
        </ul>
        {NFHPNote}
      </div>
    )
  }

  render() {
    // console.log('estuary details', props)
    const {
      name,
      region,
      state,
      type,
      acres,
      biotic,
      onZoomClick,
      onBack,
    } = this.props

    // Sort types by decreasing size
    const bioticTypes = Object.keys(biotic)
    bioticTypes.sort((a, b) => {
      if (biotic[a] > biotic[b]) return -1
      if (biotic[a] < biotic[b]) return 1
      return 0
    })

    const bioticBars = bioticTypes.map(d => ({
      key: d,
      label: bioticInfo[d].label,
      description: bioticInfo[d].description,
      value: biotic[d], // acres
      color: bioticInfo[d].color,
    }))

    const totalBiotic = Object.values(biotic).reduce(
      (result, d) => (result += d),
      0
    )
    const maxBiotic = Math.max(...Object.values(biotic))

    return (
      <div
        ref={elem => {
          this.node = elem
        }}
        id="EstuaryDetails"
        className="sidebar-inner full-height"
      >
        <header>
          <div className="is-size-4 has-text-white flex-row no-margin no-padding">
            <div
              onClick={onBack}
              className="align-self-center details-back-button"
            >
              <div
                className="fa fa-angle-double-left has-text-white is-size-3"
                title="Go back to previous view"
              />
            </div>
            <div style={{ flex: 1 }}>
              {name}
              <div className="has-text-white is-size-6">
                {stateNames[state] || ''}
              </div>
            </div>
            <div
              className="align-self-center has-text-centered details-zoom-button"
              style={{ flex: 0 }}
              title="Zoom to estuary"
              onClick={() => onZoomClick()}
            >
              <span className="fa fa-map-marker" />
            </div>
          </div>
        </header>

        <section>
          <div className="has-text-grey columns no-margin no-padding">
            <div className="column no-padding">Type: {type}</div>
            <div className="column no-padding is-narrow has-text-left-mobile-only">
              {format(',')(acres)} acres
            </div>
          </div>
          <div className="has-text-grey">Region: {region}</div>
        </section>

        <section>
          <div className="is-size-4">Focal species present</div>
          {this.renderSpeciesList()}
        </section>

        {bioticTypes.length > 0 && (
          <section>
            <div className="level no-margin">
              <div className="is-size-4">Biotic habitats</div>
              <div className="has-text-right has-text-grey-light is-size-6 is-hidden-mobile">
                {`${acresFormatter(totalBiotic)} total`}
              </div>
            </div>

            <HorizontalBarchart
              range={maxBiotic}
              bars={bioticBars}
              formatter={acresFormatter}
            />
          </section>
        )}

        <section>
          <div className="is-size-4">Risk of Fish Habitat Degradation</div>
          {this.renderNFHPList()}
        </section>
      </div>
    )
  }
}

EstuaryDetails.defaultProps = {
  onZoomClick: () => {
    console.log('onZoomClick')
  },
}

export default EstuaryDetails
