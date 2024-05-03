import React, { useState, useRef } from 'react';
import { Project } from '../../../api/projects';
import { getProjectById, editProjectPicture, exportProjectPicture } from '../../../api/projects';
import { ErrorLabel } from '../../atoms/ErrorLabel/ErrorLabel';
import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Modal, TextField, InputAdornment, Grid } from '@mui/material';
import { postProject } from '../../../api/projects';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


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
  const [projectPicture, setProjectPicture] = useState<any>('');
  const [fileName, setFileName] = useState<string | null>(null);


  const inputFileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data: any) => {
    postProject(data).then((response) => {
      const projectId = response.id;
      setProjectName(data.project_name);
      setDescription(data.description);
      if (projectPicture) {
        editProjectPicture(projectId, projectPicture);
      }
      Swal.fire({
        title: 'Project Created Successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'See project',
        cancelButtonText: 'Back to Home'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/project/${projectId}`);
        } else {
          navigate('/');
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
          <Typography variant="h5" mb={3} sx={{ textAlign: "center" }}>Project Creation Form</Typography>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item mb={2} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <TextField
                    sx={{ width: '75%' }}
                    label='Project name'
                    size='small'
                    id="input-project-name"
                    placeholder="Your project name"
                    {...register('project_name')}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {errors?.project_name && <ErrorLabel message={errors.project_name.message || ''} />}
                </Grid>
                <Grid item mb={2} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <TextField
                    rows={4}
                    multiline
                    sx={{ width: '75%' }}
                    label='Description'
                    id="input-description"
                    placeholder="Your description field"
                    {...register('description')}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors?.description && <ErrorLabel message={errors.description.message || ''} />}
                </Grid>
                <Grid item display={'flex'} justifyContent={'center'} mb={5} mt={5}>
                  <input
                    type="file"
                    id="project_picture"
                    accept="image/*"
                    ref={inputFileRef}
                    style={{ display: 'none' }} // cache l'input
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProjectPicture(file);
                        setFileName(file.name);
                      }
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      color='secondary'
                      variant="contained"
                      component="span"
                      onClick={() => inputFileRef.current && inputFileRef.current.click()}  // ouvre l'explorateur de fichiers
                    >
                      Upload
                    </Button>
                  </label>
                  {fileName && <Typography variant='body1' >{fileName}</Typography>}
                </Grid>
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" type='submit'>Submit</Button>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  )
}