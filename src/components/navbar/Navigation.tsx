import * as React from 'react';
//Mui
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Toolbar } from '@mui/material';
//Icons
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//Custom
import { ListComponent } from './ListComponent';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
//Contexts
import AvatarMenu from './AvatarMenu';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

export default function Navigation() {

  const [open, setOpen] = React.useState(window.innerWidth < 769 ? false : true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <AppBar position="absolute" open={open} sx={{ bgcolor: "background.default"}}>
      <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
            justifyContent: "space-between"
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { visibility: "hidden" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <AvatarMenu />

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} 
        sx={{ "& .MuiDrawer-paper": { borderWidth: 0 } }}
        PaperProps={{ sx: { backgroundColor: "background.default" }}}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            bgcolor: "background.default",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <ListComponent />
      </Drawer>
    </React.Fragment>
  )
}
