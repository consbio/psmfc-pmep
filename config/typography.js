import Typography from 'typography'
import theme from 'typography-theme-noriega'

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
})

const typography = new Typography(theme)

export default typography
