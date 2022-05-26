import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import * as ROUTES from '../../constants/routes'

export const ListItems = () => {  
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  navigate(ROUTES.PROFILE + currentUser.uid)
  return (
    <React.Fragment>
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </React.Fragment>
  )
}