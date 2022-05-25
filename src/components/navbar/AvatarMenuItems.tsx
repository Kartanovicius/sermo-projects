import React from 'react'
import { Logout } from '@mui/icons-material'
import { MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material'
import { useAuth } from '../../context/authContext';

export const AvatarMenuItems = () => {
  const { signOutUser } = useAuth();


  return (
    <React.Fragment>
    <MenuItem>
      <Avatar /> Profile
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