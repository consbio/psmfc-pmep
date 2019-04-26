import Typography from 'typography'
// import theme from 'typography-theme-noriega'
import { theme as style } from 'util/style'

const theme = {
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  headerFontFamily: ['Oswald', 'sans-serif'], // per PMEP branding guidelines
  bodyFontFamily: ['Open Sans', 'sans-serif'], // per PMEP branding guidelines
  bodyWeight: 400,
  headerWeight: 700,
  boldWeight: 700,
  googleFonts: [
    {
      name: 'Oswald',
      styles: ['400', '700'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '700'],
    },
  ],
  scaleRatio: 1.4,
  overrideStyles: () => ({
    html: {
      'overflow-y': 'hidden !important',
      height: '100%',
    },
    body: {
      height: '100%',
      width: '100%',
    },
    // Set height on containing notes to 100% so that full screen map layouts work
    '#___gatsby': {
      height: '100%',
    },
    '#___gatsby > *': {
      height: '100%',
    },
    button: {
      outline: 'none',
      cursor: 'pointer',
    },
    'a, a:visited': {
      color: style.colors.primary[500],
      textDecoration: 'none',
    },
    'h1,h2,h3,h4': {
      textTransform: 'uppercase', // per PMEP branding guidelines
    },
  }),
}

const typography = new Typography(theme)

export default typography
