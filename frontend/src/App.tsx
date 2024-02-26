import { useState, useEffect } from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';
import { LoginPage } from './components/templates/LoginPage/LoginPage';
import { ProjectPage } from './components/templates/ProjectPage/ProjectPage';
import { CollaboratorsPage } from './components/templates/CollaboratorsPage/CollaboratorsPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { lime, blue, } from '@mui/material/colors';

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

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme((currentTheme) => !currentTheme);
    localStorage.getItem('theme') === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
  };

  const backgroundColor = isDarkTheme ? '#000000' : '#FFFFFF';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'light') {
      setIsDarkTheme(false);
      localStorage.setItem('theme', 'light');
    } else {
      setIsDarkTheme(true);
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
                    <Route path={"/project/:id"} element={<ProjectPage />} />
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
