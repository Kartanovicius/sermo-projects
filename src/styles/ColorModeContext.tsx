import { createContext, useContext, useEffect, useState } from 'react';
import { alpha, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: '#f4f9fc',
            main: '#056DFF',
            contrastText: '#fafafa',
          },
          background: {
            default: '#eef6f8',
            paper: '#fff'
          },
          text: {
            secondary: '#79778f',
            primary: '#28234A',
          },
          action: {
            hover: '#e6f0fe',
          }
        }
      : {
          // palette values for dark mode
          primary: {
            light: '#282c3c',
            main: '#3ea3fe',
            contrastText: '#fafafa',
          },
          background: {
            default: '#222430',
            paper: '#34384a'
          },
          text: {
            secondary: '#a3a5a9',
            primary: '#fafafa',
          },
          action: {
            hover: '#283d59',
          },
        }),
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});

const ColorModeContext = createContext<any|null>(null);

export default function ColorModeProvider({children}: any) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const modeTheme = createTheme(getDesignTokens(mode));

  useEffect(() => {
    const existingPreference = localStorage.getItem('theme-data');
    if (existingPreference) {
     ( existingPreference === 'light')
        ? setMode('light')
        : setMode('dark');
    } else {
      setMode('light');
      localStorage.setItem('theme-data', 'light');
    }
  }, []);

  const value = {
    mode,
    setMode,
    modeTheme
  }

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={modeTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}