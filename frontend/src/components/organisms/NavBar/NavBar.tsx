import React from 'react';
import { Drawer } from '@mui/material';
import { AppBar, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Logo } from '../../atoms/Logo/Logo';
import { ButtonNavbar } from '../../atoms/ButtonNavbar/ButtonNavbar';
import { MailOutlineRounded } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import { Home, People, Person, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Navbar {
  isDarkTheme: boolean,
  toggleTheme: () => void;
}

const drawerWidth = 240;

export const NavBar: React.FC<Navbar> = ({ isDarkTheme, toggleTheme }) => {

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding onClick={() => navigate('/')}>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailOutlineRounded />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );

  {/* <Box sx={{ flexGrow: 1 }} >
        <AppBar position='fixed' sx={{ backgroundColor: isDarkTheme ? 'default' : 'white' }}>
          <Toolbar variant="dense" sx={{ marginTop: '5px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link to='/'>
                <Logo size={80} />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
            </Box>

            <Box mx={1}>
              <Link to='/'>
                <ButtonNavbar title="home" />
              </Link>
            </Box>

            <Box mx={1}>
              <Link to='/users'>
                <ButtonNavbar title="people" />
              </Link>
            </Box>

            <Box />

            <Box mx={1}>
              <Link to='/profile'>
                <ButtonNavbar title="person" />
              </Link>
            </Box>

            <Box mx={1}>
              <Link to='/' onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                window.location.reload();
              }}>
                <ButtonNavbar title="logout" />
              </Link>
            </Box>

          </Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {isDarkTheme ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon sx={{ color: 'black' }} />}
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
          </Box>
        </AppBar>
      </Box >
      <Box height={200}>
      </Box> */}
}