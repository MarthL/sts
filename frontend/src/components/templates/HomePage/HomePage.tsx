import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects, postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface ProjectsProps {
  id: number;
  project_name: string;
  description: string;
};

export const HomePage = () => {

  const {register, handleSubmit } = useForm();

  const [projectsCollection, setProjectsCollection] = useState<ProjectsProps[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('project collection before charging page : ', projectsCollection)
    getProjects().then(async (res) => {
      setProjectsCollection(res);
      setIsLoaded(true)
      console.log('project collection after charging page : ', projectsCollection)
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

  const onsubmit = (data: any) => {
    console.log('data : ', data)
    if(data.project_name && data.description) {
      postProject(data);
      handleCloseModal();
    }
  }

  const methods = useForm();


  return (
    <>
      <Typography variant="h3"> Welcome, {currentUser} </Typography>

      <Button variant="contained" onClick={handleOpenModal}>
        <AddCircleIcon />
        New project
      </Button>
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4 }}>
          <Typography variant="h5" sx={{textAlign:"center", marginBottom:5}}>Project creation form</Typography>
          
          <FormProvider {...methods}>
          <Grid container onSubmit={handleSubmit(onsubmit)}>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                  id="input-project-name"
                  placeholder="Your project name"
                  {...register('project_name')}
                  onChange={(e) => setProjectName(e.target.value)}
                  InputProps={{
                      startAdornment:
                        <InputAdornment disableTypography position="start">
                          Project name :
                        </InputAdornment>
                  }}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                  id="input-description"
                  placeholder="Your description field"
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                      startAdornment:
                        <InputAdornment disableTypography position="start">
                          Description :
                        </InputAdornment>
                  }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} marginBottom={2}>
            <Button variant="contained" onClick={onsubmit}>Submit</Button>
          </Grid>
          </FormProvider>
          <Button onClick={handleCloseModal}>
            <CloseIcon />
            Close
          </Button>
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