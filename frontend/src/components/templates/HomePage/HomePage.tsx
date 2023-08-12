import React from 'react';
import { CardProject } from '../../atoms/CardProject/CardProject';
import { Box } from '@mui/material';

export const HomePage = () => {
  return (
    <>
      <Box display={'flex'} alignContent={'center'} justifyContent={'space-evenly'} gap={20}>
        <Box>
          <CardProject></CardProject>
        </Box>
        <Box>
          <CardProject></CardProject>
        </Box>
        <Box>
          <CardProject></CardProject>
        </Box>
        <Box>
          <CardProject></CardProject>
        </Box>
      </Box>
    </>
  )
}