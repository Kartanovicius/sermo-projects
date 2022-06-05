import React from 'react'
import { Logout } from '@mui/icons-material'
import { MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'



export const AvatarMenuItems = (firstName: any) => {
  const { signOutUser, currentUser } = useAuth();
  const firstNameVal = firstName.firstName
  const navigate = useNavigate();

  return (
    <React.Fragment>
    <MenuItem onClick={(e) => navigate(ROUTES.PROFILE+currentUser.uid)}>
      <Avatar /> <>{firstNameVal}</>
    </MenuItem>
    <Divider />
    <MenuItem onClick={signOutUser}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </React.Fragment>
  )
}