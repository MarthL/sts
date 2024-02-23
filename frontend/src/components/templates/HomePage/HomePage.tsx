import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { useForm, FormProvider, SubmitHandler, UseFormHandleSubmit, Form } from 'react-hook-form';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid, Tooltip } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects, postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { relative } from 'path';

export type ProjectsProps = {
  id: number;
  project_name: string;
  description: string;
};

export const HomePage = () => {

  const { register, handleSubmit, formState: {errors} } = useForm();

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

  const methods = useForm<ProjectsProps>();

  const onSubmit = handleSubmit((data: any) => {
      postProject(data);
      console.log('data.project_name : ', data.project_name)
      console.log('data.description : ', data.description)
      handleCloseModal();
    })

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
          border: '1px solid #c0ca33',
          borderRadius: 5,
          boxShadow: 24,
          px: 1,
          py: 1
          }}>
          <Grid container mt={0} mx={0} p={0} position={'relative'} justifyContent={'end'}>
              <Button onClick={handleCloseModal}>
                <CloseIcon />
              </Button>              
          </Grid> 
          <Typography variant="h5" sx={{textAlign:"center", marginBottom:2}}>Project Creation Form</Typography>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <Grid container>
                <Grid item mb={2} mx={'auto'}>
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
                <Grid item mb={2} mx={'auto'}>
                  <TextField
                      id="input-description"
                      placeholder="Your description field"
                      {...register('description')}
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
              <Grid item xs={12}>
                <Button variant="contained" type='submit'>Submit</Button>
              </Grid>
            </form>
          </FormProvider>
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