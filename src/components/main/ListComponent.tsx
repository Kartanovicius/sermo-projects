import { useEffect, useState } from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import { List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';


const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  padding: '16px 24px',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    }
  },
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    }
  },
  "&.Mui-selected:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    }
  },
}));

export const ListComponent = () => {  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
          setSelectedIndex(0)
        break;
      default:
          setSelectedIndex(null)
        break;
    }
  }, [location]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{bgcolor: 'Background.default'}}>
      <StyledListItemButton 
        onClick={(e) => {navigate(ROUTES.MAIN); handleListItemClick(e, 0)}} 
        selected={selectedIndex === 0}
      >
        <ListItemIcon >
          <DashboardRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" disableTypography/>
      </StyledListItemButton>
    </List>
  )
}