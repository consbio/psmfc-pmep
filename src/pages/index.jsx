import React from 'react'

import { Layout } from 'components/Layout'

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
    <TopSection />

    <AboutSection />

    <BackgroundSection />

    <Habitat />

    <Threats />

    <PMEP />

    <NPLCC />

    <Credits />
  </Layout>
)

export default IndexPage
