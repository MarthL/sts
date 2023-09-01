import React from 'react';
import './NavBar.scss';
import { Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import { Home, People, Person } from '@mui/icons-material';
import { ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from './../../../assets/img/black_logo.png';

interface NavBarProps {

};

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar variant="dense" sx={{ backgroundColor: 'black' }} >
            <Box sx={{ flexGrow: 1 }}>
              <Link to='/'>
                <img src={logo} alt="manege logo" width={110} height={110} />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }}></Box>

            <Box mx={1}>
              <Link to='/'>
                <Tooltip title="Home">
                  <IconButton aria-label='Home'>
                    <Home color='primary' sx={{ "&:hover": { color: "white" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

            <Box mx={1}>
              <Link to='/collaborators'>
                <Tooltip title="Collaborators">
                  <IconButton >
                    <People color='primary' sx={{ "&:hover": { color: "white" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

            <Box />

            <Box mx={1}>
              <Link to='/profile'>
                <Tooltip title="Profile">
                  <IconButton>
                    <Person color="primary" sx={{ "&:hover": { color: "white" }, fontSize: 30 }} />
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
                    <ExitToApp color="primary" sx={{ "&:hover": { color: "white" }, fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>

          </Toolbar>
        </AppBar>
      </Box >
    </>
  )
}