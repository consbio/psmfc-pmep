const breakpoints = ['40em', '52em', '64em']

// generated using:
// https://palx.jxnblk.com/ee7d14
const colors = {
  pageBackground: 'hsl(228, 33%, 97%)',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  link: '#1488ee',
  primary: {
    100: '#e6eff4',
    300: '#85b1cc',
    500: '#0C649B',
    800: '#0d589b',
    900: '#001E3C',
  },
  secondary: {
    100: '#fdebeb',
    200: '#fbd4d5',
    300: '#f79b9e',
    400: '#f47074',
    500: '#ee141b',
    600: '#d71218',
    700: '#bd0f15',
    800: '#9c0d11',
    900: '#71090c',
  },
  highlight: {
    100: '#fadfc6',
    200: '#f8cca5',
    300: '#f5b67f',
    400: '#f29c50',
    500: '#ee7a14',
    600: '#d76e12',
    700: '#bc600f',
    800: '#9c500d',
    900: '#6f3909',
  },
  grey: {
    100: '#f9f9f9', // TODO: base other colors off 900
    200: '#ecedee',
    300: '#dfe0e1',
    400: '#d1d3d4',
    500: '#c1c3c6',
    600: '#b0b3b5',
    700: '#85898d',
    800: '#676c71',
    900: '#636466',
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
    backgroundColor: colors.grey[900],
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.primary[300],
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
