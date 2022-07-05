import React, { useEffect, useState } from 'react';
//Mui
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Hidden, Toolbar } from '@mui/material';
//Icons
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//Custom
import { ListComponent } from './ListComponent';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AvatarMenu from './AvatarMenu';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up('sm')]: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }

}));

const DrawerDesktop = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const DrawerMobile = styled(MuiDrawer)(
  ({ theme }) => ({
    zIndex: theme.zIndex.drawer + 2,
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'none',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      paddingTop: 32,
      paddingRight: 32,
    }
  }),
);

export default function Navigation() {
  const [open, setOpen] = useState(window.innerWidth < 769 ? false : true);
  const toggleDrawer = () => {
    setOpen(!open);
    if (open) {
      document.body.style.overflow = 'hidden'
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 600) {
        setOpen(false)
      }
    })
  })

  return (
    <React.Fragment>
      <AppBar position='absolute' open={open}>
      <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            pl: '28px!important',
            justifyContent: 'space-between'
          }}
        >
          <IconButton
            edge='start'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '10px',
              ...(open && { visibility: 'hidden' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <AvatarMenu />

        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <DrawerDesktop variant='permanent' open={open} 
          sx={{ '& .MuiDrawer-paper': { borderWidth: 0 } }}
          PaperProps={{ sx: { backgroundColor: 'background.default' }}}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              bgcolor: 'background.default',
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ display: open === true ? 'block' : 'none'}}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <ListComponent />
        </DrawerDesktop>
      </Hidden>

      <Hidden smUp>
        <DrawerMobile
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
        >
          <Box
            sx={{ width: drawerWidth }}
            role='presentation'
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <ListComponent />
          </Box>
        </DrawerMobile>
      </Hidden>
    </React.Fragment>
  )
}