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
    MuiFilledInput: {
      styleOverrides: {
        input: {
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: mode === 'light' ? '#fff' : '#34384a',
          '&& .MuiInput-root:hover::before': {
            borderColor: 'red',
          },
          '&:hover': {
            boxShadow: `${alpha(mode === 'light' ? '#f4f9fc' : '#3ea3fe', 0.25)} 0 0 0 2px`,
            borderColor: mode === 'light' ? '#f4f9fc' : '#3ea3fe',
          },
          '&:focus': {
            backgroundColor: mode === 'light' ? '#asdasd' : '#asdasd',
            boxShadow: `${alpha(mode === 'light' ? '#f4f9fc' : '#3ea3fe', 0.25)} 0 0 0 2px`,
            borderColor: mode === 'light' ? '#f4f9fc' : '#3ea3fe',
          },
        },
        // Remove underline
        underline: {
          '&:before': {
            borderBottomColor: 'transparent',
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottomColor: 'transparent',
          },
          '&:after': {
            borderBottomColor: 'transparent',
          },
          '&:focus:not(.Mui-disabled)::after': {
            borderBottomColor: 'transparent',
          },
        },
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