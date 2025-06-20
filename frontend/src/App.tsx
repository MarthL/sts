import React from 'react';
import { useState, useEffect } from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';
import { LoginPage } from './components/templates/LoginPage/LoginPage';
import { ProjectPage } from './components/templates/ProjectPage/ProjectPage';
import { CollaboratorsPage } from './components/templates/CollaboratorsPage/CollaboratorsPage';
import { UserPage } from './components/templates/UserPage/UserPage';
import { StatsPage } from './components/templates/Stats/StatsPage';
import { ClientsPage } from './components/templates/ClientsPage/ClientsPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { lime, blue, } from '@mui/material/colors';
import { NotFound } from './components/templates/NotFound/NotFound';
import { useTheme } from '@mui/material';
import ScrollToTop from './hooks/ScrollToTop';

function App() {

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: blue[600],
      },
      secondary: {
        main: '#000000',
      },
      background: {
        default: '#FFFFFF',
      },
      text: {
        primary: '#000000',
      },
    },
    typography: {
      allVariants: {
        color: 'black',
      },
    },
    components: {
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          notched: true
        }
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
      MuiOutlinedInput: {
        defaultProps: {
          notched: true
        }
      }
    },
  });

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme((currentTheme) => !currentTheme);
    localStorage.getItem('theme') === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
    window.location.reload();
  };

  const backgroundColor = isDarkTheme ? '#000000' : '#FFFFFF';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'light') {
      setIsDarkTheme(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, [])


  return (
    <>
      <div style={{ backgroundColor, minHeight: '100vh', display: 'flex', overflowX: 'hidden' }}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <Router>
            <ScrollToTop />
            <NavBar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <div style={{ flexGrow: 1, padding: '20px' }}>
              {isConnected ? (
                <>
                  <Container component={'div'} maxWidth="xl" sx={{ marginTop: "10px" }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/users" element={<CollaboratorsPage />} />
                      <Route path='/clients' element={<ClientsPage />} />
                      <Route path={"/project/:id"} element={<ProjectPage />} />
                      <Route path={'/users/:id'} element={<UserPage />} />
                      <Route path={'/stats'} element={<StatsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Container>
                </>
              ) : (
                <LoginPage />
              )}
            </div>
          </Router>
        </ThemeProvider >
      </div>
    </>
  );
}

export default App;
