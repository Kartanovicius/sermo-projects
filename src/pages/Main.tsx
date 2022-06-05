import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navigation from '../components/navbar/Navigation';
import { Outlet } from 'react-router-dom';
import mdTheme from '../styles/MdTheme';
import WeatherProvider from '../context/weatherContext';

export default function Main() {

  return (
    <WeatherProvider>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navigation />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'background.default'
                  : 'background.default',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >          
            <Toolbar />

            <Outlet />

          </Box>
        </Box>
      </ThemeProvider>
    </WeatherProvider>
  );
}
