import React, { useState, useEffect } from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';
import { LoginPage } from './components/templates/LoginPage/LoginPage';
import { CollaboratorsPage } from './components/templates/CollaboratorsPage/CollaboratorsPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { lime, purple, lightBlue } from '@mui/material/colors';
import { Switch } from '@mui/material';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976D2',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: '#5c85ff',
      },
      secondary: {
        main: '#000000',
      },
      background: {
        default: '#353030',
      },
      text: {
        primary: '#FFFFFF',
      },
    },
    typography: {
      allVariants: {
        color: '#FFFFFF',
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkTheme((currentTheme) => !currentTheme);
  };

  const backgroundColor = isDarkTheme ? '#000000' : '#FFFFFF';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }
  }, [])



  return (
    <>
      <div style={{ backgroundColor, minHeight: '100vh' }}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <Router>
            <NavBar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            {isConnected ? (
              <>
                <Container maxWidth="xl" sx={{ marginTop: "10px" }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/collaborators" element={<CollaboratorsPage />} />
                  </Routes>
                </Container>
              </>
            ) : (
              <LoginPage />
            )}
          </Router>
        </ThemeProvider >
      </div>
    </>
  );
}

export default App;
