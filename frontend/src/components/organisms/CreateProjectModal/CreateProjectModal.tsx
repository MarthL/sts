import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid } from '@mui/material';
import { postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';

export type ProjectsProps = {
  id: number;
  project_name: string;
  description: string;
  props: any;
};

interface ProjectModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ openModal, handleCloseModal }) => {
  const methods = useForm<ProjectsProps>();
  const { register, handleSubmit } = methods;
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const onSubmit = handleSubmit((data: any) => {
    postProject(data);
    handleCloseModal();
  });
  return (
    <>
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
          <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>Project Creation Form</Typography>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
    </>
  )
}