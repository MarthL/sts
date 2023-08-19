import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { Box, Typography } from '@mui/material';
import { getProjects } from '../../../api/projects';

export const HomePage = () => {

  const [projectsCollection, setProjectsCollection] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    getProjects().then((res) => {
      setProjectsCollection(res);
      setIsLoaded(true)
    });
  }, [])


  return (
    <>
      <Typography variant="h3" color="initial"> Welcome, John Doe </Typography>
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
        {/* <Box>
          <CardProject></CardProject>
        </Box>
        <Box>
          <CardProject></CardProject>
        </Box>
        <Box>
          <CardProject></CardProject>
        </Box> */}
      </Box>
    </>
  )
}