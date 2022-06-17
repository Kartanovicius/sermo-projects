// Material-ui
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navigation from '../components/navbar/Navigation';
// react-router-dom
import { Outlet } from 'react-router-dom';
// Contexts
import WeatherProvider from '../context/weatherContext';
import CurrentUserProvider from '../context/currentUserContext';

export default function Main() {
  
  return (
    <CurrentUserProvider>
      <WeatherProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navigation />
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >          

            <Toolbar />

            <Outlet />

          </Box>
        </Box>
      </WeatherProvider>
    </CurrentUserProvider>
  );
}
