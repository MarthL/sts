import React, { useEffect, useState } from 'react';
import { CardProject } from '../../molecules/CardProject/CardProject';
import { Box, Typography } from '@mui/material';
import { getProjects } from '../../../api/projects';
import { getCurrentUser } from '../../../api/users';

export const HomePage = () => {

  const [projectsCollection, setProjectsCollection] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    getProjects().then((res) => {
      setProjectsCollection(res);
      setIsLoaded(true)
    });
  }, [])

  useEffect(() => {
    getCurrentUser().then(async (res) => {
      setCurrentUser(res.username);
    });
  }, [])


  return (
    <>
      <Typography variant="h3" color="initial"> Welcome, {currentUser[0].toUpperCase() + currentUser.slice(1)} </Typography>
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