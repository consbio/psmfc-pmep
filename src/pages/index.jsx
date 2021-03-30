import React from 'react'

import Layout from 'components/Layout'
import SEO from 'components/SEO'

import {
  TopSection,
  AboutSection,
  BackgroundSection,
  Habitat,
  Threats,
  PMEP,
  NPLCC,
  Credits,
} from 'blocks/home'

const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" /> */}

    <TopSection />
{/*
    <AboutSection />

    <BackgroundSection />

    <Habitat />

    <Threats />

    <PMEP />

    <NPLCC />

    <Credits /> */}
  </Layout>
)

export default IndexPage
