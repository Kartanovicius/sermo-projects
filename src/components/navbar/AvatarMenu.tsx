import { Avatar, Icon, Button, styled, Menu } from '@mui/material';
import { useState } from 'react';
import useUser from '../../hooks/use-user';
import { useAuth } from '../../context/authContext';
import { AvatarMenuItems } from './AvatarMenuItems';

const AvatarButton = styled(Button)(() => ({
  backgroundColor: '#f9f9f9',
  color: '#000',
  '&:hover': {
    backgroundColor: "#fff",
    color: "#086cff",
  },
  fontWeight: 'normal',
  border: 'none',
  textTransform: 'lowercase'
}));

function AvatarMenuContent() {
  const { currentUser } = useAuth()
  const { user } = useUser(currentUser.uid)
  const nameFirstLetter: string = user?.first.charAt(0).toUpperCase()
  const surnameFirstLetter: string = user?.last.charAt(0).toUpperCase()
  const email: string = user?.emailAddress

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAvatar = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <AvatarButton onClick={handleClick}>
        <Icon sx={{ mr: 1, width: 30, height: 30 }}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: "primary.main", fontSize: 14 }}>{nameFirstLetter}{surnameFirstLetter}</Avatar>
        </Icon>
        {email}
      </AvatarButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAvatar}
        onClose={handleClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            mt: 0.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <AvatarMenuItems setAnchorEl={setAnchorEl}/>
      </Menu>
    </>
  );
}

export default function AvatarMenu() {
  return <AvatarMenuContent />;
}