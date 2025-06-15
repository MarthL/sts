import React from 'react';
import { Grid, Typography } from '@mui/material';
import { CardProject } from '@/components/molecules/CardProject/CardProject';
import { Project } from '@/api/projects';
import { useState } from 'react';

type ProjectsListHomeProps = {
  projects: Project[];
};

export const ProjectsListHome: React.FC<ProjectsListHomeProps> = ({ projects }) => {

  return (
    <>
      {
        projects.length > 0 ? (
          projects.map((project: Project) => (
            <Grid key={project.id} item xs={12} sm={12} md={4} lg={4}>
              <CardProject project={project}></CardProject>
            </Grid>
          ))
        ) : (
          <Grid container mt={5} display={'flex'} justifyContent={'center'}>
            <Typography variant="h6" color={'primary'} >Aucun projet à afficher</Typography>
          </Grid>
        )
      }
    </>
  )
}