import React, { useState, useEffect } from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';
import { LoginPage } from './components/templates/LoginPage/LoginPage';
import { CollaboratorsPage } from './components/templates/CollaboratorsPage/CollaboratorsPage';


function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
    }
  }, [])



  return (
    <>
      <Router>
        <NavBar />
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
    </>
  );
}

export default App;
