module.exports = {
  breakpoints: ['40em', '52em', '64em'],
  useColorSchemeMediaQuery: false,
  useRootStyles: true,
  colors: {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 0%)',
    link: '#1488ee',
    // generated using:
    // https://palx.jxnblk.com/ee7d14
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
  },
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: 'Oswald, sans-serif',
  },
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72, 112],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.4,
    heading: 1,
  },
  layout: {
    container: {
      maxWidth: '960px',
    },
    sidebar: {
      width: ['100%', '468px'],
      borderRightWidth: ['0px', '1px'],
      borderRightColor: 'grey.8',
    },
  },
  text: {
    default: {
      display: 'block', // fix for theme-ui v6 (div => span)
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
    },
  },
  buttons: {
    primary: {
      cursor: 'pointer',
      // FIXME: enable
      // '&:hover': {
      //   bg: darken('primary', 0.1),
      // },
    },
    secondary: {
      cursor: 'pointer',
      color: 'grey.9',
      bg: 'grey.1',
    },
    accent: {
      cursor: 'pointer',
      color: '#FFF',
      bg: 'accent',
    },
    close: {
      cursor: 'pointer',
      outline: 'none',
      background: 'none',
      color: 'grey.5',
      '&:hover': { color: 'grey.9' },
    },
  },
  images: {
    screenshot: {
      border: '1px solid',
      borderColor: 'grey.500',
      m: '1rem',
    },
  },
  styles: {
    root: {
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'hidden',
      body: {
        margin: 0,
        height: '100%',
      },
      '#___gatsby': {
        height: '100%',
      },
      '#___gatsby > *': {
        height: '100%',
      },
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: '112.5%',
      textRendering: 'optimizeLegibility',
      'a, a:visited': {
        color: 'link',
        textDecoration: 'none',
      },
      'a:hover': {
        textDecoration: 'underline',
      },
      'h1,h2,h3,h4': {
        textTransform: 'uppercase', // per PMEP branding guidelines
      },
    },
  },
}
