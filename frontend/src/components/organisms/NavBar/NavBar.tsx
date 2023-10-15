import React from 'react';
import './NavBar.scss';
import { Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import { Home, People, Person } from '@mui/icons-material';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import logo from './../../../assets/img/black_logo.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavBarProps {

};

export const NavBar: React.FC<any> = ({ isDarkTheme, toggleTheme }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position='static' sx={{ backgroundColor: isDarkTheme ? 'default' : 'white' }}>
          <Toolbar variant="dense" >
            <Box sx={{ flexGrow: 1 }}>
              <Link to='/'>
                <img src={logo} alt="manege logo" width={110} height={110} />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
            </Box>

            <Box mx={1}>
              <Link to='/'>
                <Tooltip title="Home">
                  <IconButton aria-label='Home'>
                    <Home color='primary' sx={{ "&:hover": { color: "black" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

            <Box mx={1}>
              <Link to='/collaborators'>
                <Tooltip title="Collaborators">
                  <IconButton >
                    <People color='primary' sx={{ "&:hover": { color: "black" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

            <Box />

            <Box mx={1}>
              <Link to='/profile'>
                <Tooltip title="Profile">
                  <IconButton>
                    <Person color="primary" sx={{ "&:hover": { color: "black" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

            <Box mx={1}>
              <Link to='/' onClick={() => {
                localStorage.removeItem('token')
                window.location.reload();
              }}>
                <Tooltip title="Logout">
                  <IconButton>
                    <ExitToApp color="primary" sx={{ "&:hover": { color: "black" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

          </Toolbar>
        </AppBar>
      </Box >

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {isDarkTheme ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon />}
        <Switch
          checked={isDarkTheme}
          color='success'
          onChange={toggleTheme}
          sx={{
            '& .MuiSwitch-thumb': {
              color: 'white', // Couleur du bouton
            },
            '& .MuiSwitch-track': {
              color: 'white', // Couleur du track
            },
            '&:not(.Mui-checked)': {
              '& .MuiSwitch-track': {
                color: 'white', // Couleur du track lorsque le switch est "off"
              },
            },
          }}
        />
      </Box>
    </>
  )
}