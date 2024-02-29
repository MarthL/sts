// import React, { useState } from 'react';
// import { Drawer, Switch } from '@mui/material';
// import { Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { Logo } from '../../atoms/Logo/Logo';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Home, People, Person, ExitToApp } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// interface Navbar {
//   isDarkTheme: boolean,
//   toggleTheme: () => void;
// }

// const drawerWidth = 200;

// export const NavBar: React.FC<Navbar> = ({ isDarkTheme, toggleTheme }) => {

//   const navigate = useNavigate();
//   const [open, setOpen] = useState(true);

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   return (
//     <>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <Drawer
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             '& .MuiDrawer-paper': {
//               width: drawerWidth,
//               boxSizing: 'border-box',
//             },
//           }}
//           variant="permanent"
//           anchor="left"
//         >
//           <Toolbar />
//           <Box display={'flex'} alignItems={'center'} justifyContent={'center'} pb={5} >
//             <Logo size={100} />
//           </Box>
//           <Divider />
//           <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//             <ListItem disablePadding onClick={() => navigate('/')}>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <Home />
//                 </ListItemIcon>
//                 <ListItemText primary={'Home'} />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => navigate('/users')}>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <People />
//                 </ListItemIcon>
//                 <ListItemText primary={'Users'} />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => navigate('/profile')}>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <Person />
//                 </ListItemIcon>
//                 <ListItemText primary={'My Profile'} />
//               </ListItemButton>
//             </ListItem>
//             <div style={{ flexGrow: 1 }}></div>
//             <ListItem disablePadding onClick={() => {
//               localStorage.removeItem('token')
//               localStorage.removeItem('name')
//               window.location.reload();
//             }}>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <ExitToApp />
//                 </ListItemIcon>
//                 <ListItemText primary={'Logout'} />
//               </ListItemButton>
//             </ListItem>
//           </List>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             {isDarkTheme ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon sx={{ color: 'black' }} />}
//             <Switch
//               checked={isDarkTheme}
//               color='success'
//               onChange={toggleTheme}
//               sx={{
//                 '& .MuiSwitch-thumb': {
//                   color: 'white',
//                 },
//                 '& .MuiSwitch-track': {
//                   color: 'white',
//                 },
//                 '&:not(.Mui-checked)': {
//                   '& .MuiSwitch-track': {
//                     color: 'white',
//                   },
//                 },
//               }}
//             />
//           </Box>
//         </Drawer>
//       </Box>
//     </>
//   );

//   {/* <Box sx={{ flexGrow: 1 }} >
//         <AppBar position='fixed' sx={{ backgroundColor: isDarkTheme ? 'default' : 'white' }}>
//           <Toolbar variant="dense" sx={{ marginTop: '5px' }}>
//             <Box sx={{ flexGrow: 1 }}>
//               <Link to='/'>
//                 <Logo size={80} />
//               </Link>
//             </Box>

//             <Box sx={{ flexGrow: 1 }}>
//             </Box>

//             <Box mx={1}>
//               <Link to='/'>
//                 <ButtonNavbar title="home" />
//               </Link>
//             </Box>

//             <Box mx={1}>
//               <Link to='/users'>
//                 <ButtonNavbar title="people" />
//               </Link>
//             </Box>

//             <Box />

//             <Box mx={1}>
//               <Link to='/profile'>
//                 <ButtonNavbar title="person" />
//               </Link>
//             </Box>

//             <Box mx={1}>
//               <Link to='/' onClick={() => {
//                 localStorage.removeItem('token')
//                 localStorage.removeItem('name')
//                 window.location.reload();
//               }}>
//                 <ButtonNavbar title="logout" />
//               </Link>
//             </Box>

//           </Toolbar>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             {isDarkTheme ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon sx={{ color: 'black' }} />}
//             <Switch
//               checked={isDarkTheme}
//               color='success'
//               onChange={toggleTheme}
//               sx={{
//                 '& .MuiSwitch-thumb': {
//                   color: 'white',
//                 },
//                 '& .MuiSwitch-track': {
//                   color: 'white',
//                 },
//                 '&:not(.Mui-checked)': {
//                   '& .MuiSwitch-track': {
//                     color: 'white',
//                   },
//                 },
//               }}
//             />
//           </Box>
//         </AppBar>
//       </Box >
//       <Box height={200}>
//       </Box> */}
// }
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import { Home, People, Person, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

const drawerWidth = 240;

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Navbar {
  isDarkTheme: boolean,
  toggleTheme: () => void;
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Home, People, Person, ExitToApp
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'center', mr: 3 }}>
            <Logo size={100} />
          </Box>
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding onClick={() => navigate('/')}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate('/users')}>
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate('/profile')}>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={'My Profile'} />
            </ListItemButton>
          </ListItem>
          <div style={{ flexGrow: 1 }}></div>
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
          <ListItem disablePadding>
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
                }}
              />           
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          
          
        </Box>
      </Drawer>
    </Box>
  );
}