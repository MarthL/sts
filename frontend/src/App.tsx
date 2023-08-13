import React from 'react';
import { NavBar } from './components/organisms/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProfilePage } from './components/templates/ProfilePage/ProfilePage';
import { HomePage } from './components/templates/HomePage/HomePage';


function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ marginTop: "10px" }}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
