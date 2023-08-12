import React from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';


function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
