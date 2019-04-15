import Typography from 'typography'
import theme from 'typography-theme-noriega'

import { theme as style } from 'util/style'

theme.overrideThemeStyles = () => ({
  html: {
    overflowY: 'hidden',
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
    color: '#3273dc',
    textDecoration: 'none',
  },
})

const typography = new Typography(theme)

export default typography
