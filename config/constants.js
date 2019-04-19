export const fullBounds = [[32.5, -124.7], [49, -117.1]] // Leaflet lat,lon format

export const states = ['WA', 'ORWA', 'OR', 'CA']

export const stateNames = {
  WA: 'Washington',
  OR: 'Oregon',
  ORWA: 'Oregon / Washington',
  CA: 'California',
}

export const regions = [
  'Salish Sea',
  'Washington, Oregon, Northern California Coast',
  'Central California',
  'Southern California Bight',
]

export const estuaryTypes = [
  'Embayment/Bay',
  'Major River Delta',
  'Riverine Estuary',
  'Lagoonal Estuary',
]

export const species = [
  'BatRay',
  'BayShrimp',
  'BrownRockfish',
  'CaliforniaHalibut',
  'ChinookSalmon',
  'CohoSalmon',
  'DungenessCrab',
  'EnglishSole',
  'GreenSturgeon',
  'LeopardShark',
  'PacificHerring',
  'ShinerPerch',
  'StaghornSculpin',
  'StarryFlounder',
  'Steelhead',
]

export const sppEOLIDs = {
  BatRay: '46561010',
  BayShrimp: '1021223',
  BrownRockfish: '46568119',
  CaliforniaHalibut: '46570506',
  ChinookSalmon: '46563139',
  CohoSalmon: '46563137',
  DungenessCrab: '46505946',
  EnglishSole: '46570134',
  GreenSturgeon: '46561178',
  LeopardShark: '46560018',
  PacificHerring: '1156440',
  ShinerPerch: '46572845',
  StaghornSculpin: '46569026',
  StarryFlounder: '46570116',
  Steelhead: '46563138',
}

export const lifeStageLabels = {
  P: 'present',
  JP: 'juvenile present',
}

export const nfhpCodes = [0, 1, 2, 3, 4, 5]
export const nfhpLabels = [
  'Very High',
  'High',
  'Moderate',
  'Low',
  'Very Low',
  'Not assessed in the 2015 National Fish Habitat Assessment', // includes nodata, not scored by NFHAP, etc
]

// Size classes adapted from page 127 in SoK, converted to acres
export const sizeClasses = [[0, 25], [25, 250], [250, 2500], [2500, Infinity]]
export const sizeClassLabels = [
  '0 - 25 acres',
  '25 - 250 acres',
  '250 acres - 2,500 acres',
  '> 2,500 acres',
]

export const sppCountClasses = [10, 6, 1, 0, -1] // classifying is handled in filters.js
export const sppCountClassLabels = [
  '10-15 species present',
  '5-9 species present',
  '1-5 species present',
  'no species found',
  'not inventoried for species',
]

export const bioticTypes = [
  '2.5',
  '2.5.1',
  '2.5.2',
  '2.6',
  '2.6.1',
  '2.6.1.1',
  '2.7',
  '2.7.1',
  '2.7.1.1',
  '2.8',
  '2.8.1',
  '2.8.1.1',
]

// Links to NatureServe's CMECs site, descriptions were extracted from there
export const bioticInfo = {
  '2.5': {
    label: 'Aquatic Vegetation Bed',
    description:
      'Subtidal or intertidal bottoms and other areas dominated by rooted vascular plants, attached macroalgae, or mosses, which are usually submersed in the water column or floating on the surface. They may be exposed during low tides.',
    color: 'rgb(102, 205, 171)',
    vtID: 0, // _symbol in ArcGIS online vector tiles
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/394.html',
  },
  '2.5.1': {
    label: 'Benthic Macroalgae',
    description:
      'Aquatic beds dominated by macroalgae attached to the substrate, such as kelp, intertidal fucoids, and calcareous algae. Macroalgal communities can exist at all depths within the photic zone, on diverse substrates, and across a range of energy and water chemistry regimes.',
    color: 'rgb(0, 168, 132)',
    vtID: 1,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/433.html',
  },
  '2.5.2': {
    label: 'Aquatic Vascular Vegetation',
    description:
      'Aquatic vascular vegetation beds dominated by submerged, rooted, vascular species (such as seagrasses, Figure 8.15) or submerged or rooted floating freshwater tidal vascular vegetation.',
    color: 'rgb(68, 101, 137)',
    vtID: 2,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/434.html',
  },
  '2.6': {
    label: 'Emergent Wetland',
    description:
      'Areas in this class are characterized by erect, rooted, herbaceous hydrophytes—excluding emergent mosses and lichens. This vegetation is present for most of the growing season in most years. These wetlands are usually dominated by perennial plants. These areas may be diked or disconnected from tidal influence, but are within the historical extent of the estuary.',
    color: 'rgb(115, 178, 255)',
    vtID: 3,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/395.html',
  },
  '2.6.1': {
    label: 'Emergent Tidal Marsh',
    description:
      'Communities dominated by emergent, halophytic, herbaceous vegetation (with occasional woody forbs or shrubs) along low-wave-energy, intertidal areas of estuaries and rivers.',
    color: 'rgb(0, 77, 168)',
    vtID: 4,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/435.html',
  },
  '2.6.1.1': {
    label: 'Brackish Emergent Tidal Marsh',
    description:
      'Marshes dominated by species with a wide range of salinity tolerance. Depending on the salinity levels (0.5-30), more or less salt-intolerant species may be present. ',
    color: 'rgb(0, 15, 90)',
    vtID: 5,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/568.html',
  },
  '2.7': {
    label: 'Scrub-Shrub Wetland',
    description:
      'Areas in this class are dominated by woody vegetation that is generally less than 6 meters tall. Characteristic species include true shrubs, young trees, and trees or shrubs that are small or stunted due to environmental conditions. These areas may be diked or disconnected from tidal influence, but are within the historical extent of the estuary.',
    color: 'rgb(215, 215, 158)',
    vtID: 6,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/396.html',
  },
  '2.7.1': {
    label: 'Tidal Scrub-Shrub Wetland',
    description:
      'Estuarine or tidal riverine areas dominated by shrub vegetation that has less than 10% tree cover.',
    color: 'rgb(230, 230, 0)',
    vtID: 7,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/437.html',
  },
  '2.7.1.1': {
    label: 'Brackish Tidal Scrub-Shrub Wetland',
    description:
      'Tidal areas dominated by shrub or immature tree species that are less than 6 meters tall and have a range of salt tolerance.',
    color: 'rgb(115, 115, 0)',
    vtID: 8,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/574.html',
  },
  '2.8': {
    label: 'Forested Wetland',
    description:
      'Areas in this class are characterized by woody vegetation that is generally 6 meters or taller. These areas may be diked or disconnected from tidal influence, but are within the historical extent of the estuary.',
    color: 'rgb(171, 205, 102)',
    vtID: 9,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/397.html',
  },
  '2.8.1': {
    label: 'Tidal Forested Wetland',
    description:
      'Estuarine or tidal riverine areas with greater than 10% tree cover',
    color: 'rgb(76, 115, 0)',
    vtID: 10,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/438.html',
  },
  '2.8.1.1': {
    label: 'Brackish Tidal Forest/Woodland',
    description:
      'Tidal areas dominated by tree species that are greater than 6 meters tall and have a range of salt tolerance. Salinities may range from 0.5-30.',
    color: 'rgb(35,50,0)',
    vtID: 11,
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/578.html',
  },
}
