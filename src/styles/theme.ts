export default {
  grid: {
    container: '130rem',
    gutter: '3.2rem'
  },
  shadow: {
    elevateCardShadow: '0rem 0rem 0.2rem #BFC1C2'
  },
  border: {
    radius: '1rem'
  },
  font: {
    poppins:
      "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    inter:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

    light: 300,
    normal: 400,
    medium: 500,
    bold: 600,
    sizes: {
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      huge: '5.2rem'
    }
  },
  colors: {
    primary: '#0393BE',
    secondary: '#0DBF87',
    mainBg: '#F8FAFA',
    white: '#ffffff',
    black: '#13110C',
    lightGray: '#BFC1C2',
    gray: '#717273',
    yellow: '#F4DA85',
    red: '#EE4C4C',
    silver: '#414647',
    lightSilver: '#97AEB1',
    weakGray: '#DADEEC'
    /* adcolor:
      'linear-gradient(270deg, #FFF600 0%, #F7D10A 11.25%, #F5B112 23.02%, #F07B11 35.29%, #DE5713 49.25%, #D02F25 60.51%, #71234B 73.46%, #582158 86.74%, #29176D 100%);' */
  },
  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  }
} as const;
