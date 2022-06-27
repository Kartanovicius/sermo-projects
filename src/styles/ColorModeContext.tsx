import { createContext, useContext, useEffect, useState } from 'react'
import { alpha, createTheme, PaletteMode, ThemeProvider } from '@mui/material'
import { Shadows } from '@mui/material/styles/shadows'

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: '#4693ff',
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
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#eef6f8' : '#222430',    
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiDialog-paper': {
            backgroundImage: 'none',
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:focus': {
            backgroundColor: 'transparent',
          },
          '&.Mui-error': {
            input: {
              '&:hover': {
                boxShadow: `${alpha(mode === 'light' ? '#ffd7d8' : '#B65757', 0.25)} 0 0 0 2px`,
                borderColor: mode === 'light' ? '#ffd7d8' : '#B65757',
              },
              '&:focus': {
                boxShadow: `${alpha(mode === 'light' ? '#ffd7d8' : '#B65757', 0.25)} 0 0 0 2px`,
              },
              '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${mode === 'light' ? '#fff' : '#34384a'} inset`,
              },
            },
          },
          'input[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none', 
            margin: 0,
          },
          'input[type=number]::-webkit-outer-spin-button': {
            WebkitAppearance: 'none', 
            margin: 0,
          },
        },
        input: {
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundColor: 'transparent',
          select: {
            '&$focused': {
              fill: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            },
          },
          '&:hover': {
            boxShadow: `${alpha(mode === 'light' ? '#4693ff' : '#3ea3fe', 0.25)} 0 0 0 2px`,
            borderColor: mode === 'light' ? '#4693ff' : '#3ea3fe',
          },
          '&:focus': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(mode === 'light' ? '#4693ff' : '#3ea3fe', 0.25)} 0 0 0 2px`,
            borderColor: mode === 'light' ? '#4693ff' : '#3ea3fe',
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${mode === 'light' ? '#fff' : '#34384a'} inset`,
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
          '&.Mui-error:after': {
            borderBottomColor: 'transparent',
          },
        },
      },
    },
  },
  shadows: Array(25).fill('none') as Shadows,
})

const ColorModeContext = createContext<any|null>(null)

export default function ColorModeProvider({children}: any) {
  const [mode, setMode] = useState<PaletteMode>('light')

  const modeTheme = createTheme(getDesignTokens(mode))

  useEffect(() => {
    const existingPreference = localStorage.getItem('theme-data')
    if (existingPreference) {
     ( existingPreference === 'light')
        ? setMode('light')
        : setMode('dark')
    } else {
      setMode('light')
      localStorage.setItem('theme-data', 'light')
    }
  }, [])

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