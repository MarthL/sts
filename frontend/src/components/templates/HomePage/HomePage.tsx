import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { useForm, FormProvider, SubmitHandler, UseFormHandleSubmit, Form } from 'react-hook-form';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid } from '@mui/material';
import { ChartDashboard } from '../../organisms/ChartDashboard/ChartDashboard';
import { getProjects, postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';


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

  // const onsubmit = (data: any) => {
  //   console.log('data : ', data)
  //   if(data.project_name && data.description) {
  //     postProject(data);
  //     handleCloseModal();
  //   }
  // }

  const methods = useForm<ProjectsProps>();

  // const onsubmit = async (data: any) => {
  //   try {
  //     // Appeler postProject pour sauvegarder les données du projet dans la base de données
  //     await postProject(data);
      
  //     // Mettre à jour la liste des projets en récupérant les projets mis à jour depuis la base de données
  //     const updatedProjects = await getProjects();
  //     setProjectsCollection(updatedProjects);
  
  //     // Fermer le modal après la soumission réussie
  //     handleCloseModal();
  //   } catch (error: any) {
  //     console.error('Erreur lors de la création du projet :', error.message);
  //     // Gérer les erreurs
  //   }
  // }

  const onSubmit = handleSubmit((data: any) => {
      postProject(data);
      console.log('data.project_name : ', data.project_name)
      console.log('data.description : ', data.description)
      handleCloseModal();
      // window.location.reload();
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
          border: '2px solid #000',
          boxShadow: 24,
          p: 4 }}>
          <Typography variant="h5" sx={{textAlign:"center", marginBottom:5}}>Project creation form</Typography>
          
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Grid container>
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
              <Grid item xs={12} marginBottom={2}>
                <Button variant="contained" type='submit'>Submit</Button>
              </Grid>
            </form>
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