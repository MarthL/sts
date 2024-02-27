import React, { useState } from 'react';
import { Project } from '../../../api/projects';
import { getProjectById } from '../../../api/projects';
import { ErrorLabel } from '../../atoms/ErrorLabel/ErrorLabel';
import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid } from '@mui/material';
import { postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';


interface ProjectModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

const resolver: Resolver<Project> = async (values) => {
  return {
    values: values.project_name && values.description ? values : {},
    errors: !values.project_name && !values.description
      ? {
        project_name: {
          type: "required",
          message: "This is required.",
        },
        description: {
          type: 'required',
          message: 'This is required',
        },
      }
      : !values.project_name
        ? {
          project_name: {
            type: "required",
            message: "This is required.",
          },
        }
        : !values.description
          ? {
            description: {
              type: 'required',
              message: 'This is required',
            },
          }
          : {}
  };
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ openModal, handleCloseModal }) => {
  const methods = useForm<Project>({ resolver });
  const { register, handleSubmit, formState: { errors } } = methods;
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>();

  const onSubmit = handleSubmit((data: any) => {
    postProject(data).then((response) => {
      const projectId = response.id;
      setProjectName(data.project_name);
      setDescription(data.description);
      Swal.fire({
        title: 'Project Created Successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Go to see your new Project',
        cancelButtonText: 'Return to Home'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/project/${projectId}`;
        } else {
          window.location.href = '/';
        }
      });
    });
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
                  {errors?.project_name && <ErrorLabel message={errors.project_name.message || ''} />}
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
                  {errors?.description && <ErrorLabel message={errors.description.message || ''} />}
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