import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { Box, Typography, Button, Grid } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects } from '../../../api/projects';
import { ProjectModal } from '../../organisms/CreateProjectModal/CreateProjectModal';
import { Pagination } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


import { Project } from '../../../api/projects';

export const HomePage = () => {

  const [projectsCollection, setProjectsCollection] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projectsCollection.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      gsap.to(window, { duration: 0.5, scrollTo: { y: 0 } });
    }
  };


  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
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
        <AddCircleIcon sx={{ marginRight: '10px' }} />
        New project
      </Button>

      <ProjectModal openModal={openModal} handleCloseModal={handleCloseModal} />

      <ChartDashboard />
      <Grid container spacing={10}>
        {
          currentProjects.map((project: Project) => {
            return (
              <Grid key={project.id} item xs={12} sm={12} md={12} lg={4}>
                <CardProject id={project.id} project_name={project.project_name} description={project.description}></CardProject>
              </Grid>
            )
          })
        }
      </Grid>
      <Box width={'100vw'} display={'flex'} justifyContent={'center'}>
        <Pagination
          count={Math.ceil(projectsCollection.length / itemsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
          sx={{ marginBottom: '50px', '& .MuiPaginationItem-root': { fontSize: '1.2rem' }, '& .MuiPaginationItem-sizeSmall': { padding: '10px' }, }}
        />
      </Box>
    </>
  )
}