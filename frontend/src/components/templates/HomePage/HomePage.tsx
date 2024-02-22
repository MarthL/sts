import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { Box, Typography, Button, Modal } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects } from '../../../api/projects';

export const HomePage = () => {

  const [projectsCollection, setProjectsCollection] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getProjects().then(async (res) => {
      setProjectsCollection(res);
      setIsLoaded(true)
    });
    const storedName = localStorage.getItem('name');
    if (storedName !== null) {
      setCurrentUser(storedName[0].toUpperCase() + storedName.slice(1));
    }
  }, [])


  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <>
      <Typography variant="h3"> Welcome, {currentUser} </Typography>

      <Button variant="contained" onClick={handleOpenModal}>Créer un projet</Button>
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4 }}>
          <Typography variant="h5" sx={{textAlign:"center"}}>Formulaire de création de projet</Typography>
          
          <Button variant="contained" onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
      

      <ChartDashboard />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={20}>
        {
          projectsCollection.map((project: any) => {
            return (
              <Box>
                <CardProject key={project.id} project_name={project.project_name} description={project.description}></CardProject>
              </Box>
            )
          })
        }
      </Box>
    </>
  )
}