import React, { useState, useEffect } from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';
import { LoginPage } from './components/templates/LoginPage/LoginPage';
import { CollaboratorsPage } from './components/templates/CollaboratorsPage/CollaboratorsPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { lime, blue, } from '@mui/material/colors';
import { Switch } from '@mui/material';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: blue[600],
      },
      secondary: {
        main: '#000000', // Couleur de vos icônes en mode clair
      },
      background: {
        default: '#FFFFFF', // Couleur de fond de la barre de navigation en mode clair
      },
      text: {
        primary: '#000000', // Couleur du texte en mode clair
      },
    },
    typography: {
      allVariants: {
        color: 'black', // Couleur du texte en mode clair
      },
    },
    components: {
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: lime[600],
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
    components: {
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
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
