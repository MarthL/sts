import React, { useEffect, useState } from 'react';
import { CardProject } from '../../atoms/CardProject/CardProject';
import { Box } from '@mui/material';
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
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={20}>
        {
          projectsCollection.map((project: any) => {
            return (
              <Box>
                <CardProject key={project.id} name={project.name} description={project.description}></CardProject>
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