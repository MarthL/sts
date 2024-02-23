import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { Box, Typography, Button } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects } from '../../../api/projects';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ProjectModal } from '../../organisms/CreateProjectModal/CreateProjectModal';

export type ProjectsProps = {
  id: number;
  project_name: string;
 description: string;
};

export const HomePage = () => {

  const [projectsCollection, setProjectsCollection] = useState<ProjectsProps[]>([]);
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

      <Button variant="contained" onClick={handleOpenModal}>
        <AddCircleIcon />
        New project
      </Button>

      <ProjectModal openModal={openModal} handleCloseModal={handleCloseModal} />
      
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