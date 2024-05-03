import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Logo } from '../../atoms/Logo/Logo';
import { Home, People, Person, ExitToApp, QueryStats } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Divider, Switch } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import { ModeNight } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

interface Navbar {
  isDarkTheme: boolean,
  toggleTheme: () => void;
}

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const NavBar: React.FC<Navbar> = ({ isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(() => {
    const savedState = localStorage.getItem('navbarOpen');
    return savedState ? JSON.parse(savedState) : false;
  });

  const handleDrawerOpen = () => {
    setOpen(!open);
    localStorage.setItem('navbarOpen', JSON.stringify(!open));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ mt: 1 }}>
            {open ? <Logo size={100} /> : null}
          </Box>
          <IconButton onClick={handleDrawerOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => navigate('/')}>
            <ListItemButton selected={location.pathname === "/"}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate('/users')}>
            <ListItemButton selected={location.pathname === "/users"}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate('/profile')}>
            <ListItemButton selected={location.pathname === "/profile"}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={'My Profile'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate('/stats')}>
            <ListItemButton selected={location.pathname === "/stats"}>
              <ListItemIcon>
                <QueryStats />
              </ListItemIcon>
              <ListItemText primary={'Stats'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Box flexGrow={1} height={'100%'}></Box>
          <ListItem>
            <ListItemButton disableGutters>
              <ListItemIcon>
                <WbSunny />
              </ListItemIcon>
              <ListItemIcon>
                <Switch
                  checked={isDarkTheme}
                  color='success'
                  onChange={toggleTheme}
                  sx={{
                    '& .MuiSwitch-thumb': {
                      color: 'white',
                    },
                    '& .MuiSwitch-track': {
                      color: 'white',
                    },
                    '&:not(.Mui-checked)': {
                      '& .MuiSwitch-track': {
                        color: 'white',
                      },
                    },
                    margin: 'auto'
                  }}
                />
              </ListItemIcon>
              <ListItemIcon>
                <ModeNight sx={{ marginLeft: 'auto' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            window.location.reload();
          }}>
            <ListItemButton>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box >
  );
}