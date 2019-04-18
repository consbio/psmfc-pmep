const breakpoints = ['40em', '52em', '64em']

// generated using: https://palx.jxnblk.com/073763
const colors = {
  pageBackground: 'hsl(228, 33%, 97%)',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  link: '#3273dc',
  highlight: '#ee7d14',
  primary: {
    100: '#e8ecf0',
    200: '#ced8e0',
    300: '#b1c0ce',
    400: '#8da4b7',
    500: '#5e7e9a',
    600: '#073863',
    700: '#063158',
    800: '#052a4b',
    900: '#04223c',
  },
  secondary: {
    100: '#f1eaea',
    200: '#e3d2d3',
    300: '#d2b7b8',
    400: '#bd9698',
    500: '#a16a6b',
    600: '#63070a',
    700: '#580608',
    800: '#4c0507',
    900: '#3d0406',
  },
  grey: {
    100: '#f9f9f9',
    200: '#ecedee',
    300: '#dfe0e1',
    400: '#d1d3d4',
    500: '#c1c3c6',
    600: '#b0b3b5',
    700: '#85898d',
    800: '#676c71',
    900: '#394046',
  },
}

const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128]

const lineHeights = [1, 1.125, 1.25, 1.5]

const fontWeights = {
  normal: 400,
  semibold: 600,
}

/**
 * Letter-spacing should vary, depending on usage of text
 */
const letterSpacings = {
  normal: 'normal',
  caps: '0.25em',
  labels: '0.05em',
}

/**
 * Border-radius
 */
const radii = [0, 2, 4, 8, 16]

const buttons = {
  default: {
    backgroundColor: colors.grey[800],
  },
  primary: {
    backgroundColor: colors.primary[700],
  },
  secondary: {
    backgroundColor: colors.primary[500],
  },
  disabled: {
    backgroundColor: colors.grey[300],
  },
}

export const theme = {
  name: 'Default',
  breakpoints,
  colors,
  buttons,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
}
