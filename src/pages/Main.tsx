// Material-ui
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Navigation from '../components/main/Navigation'
// react-router-dom
import { Outlet } from 'react-router-dom'
// Contexts
import CurrentUserProvider from '../context/currentUserContext'
import { DialogProvider } from 'react-dialog-async'

export default function Main() {
  
  return (
    <CurrentUserProvider>
      <DialogProvider>
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
      </DialogProvider>
    </CurrentUserProvider>
  )
}
