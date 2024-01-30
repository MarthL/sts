//import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material'

interface ProgressProfileProps {
  name: string;
  value: number;
}

export const ProgressProfile = (props: ProgressProfileProps) => {

  const { name, value } = props;

  return (
    <>
      <Box component={'div'} padding={3} >
        <Typography variant="body1">{name}</Typography>
        <LinearProgress variant="determinate" value={value} sx={{ height: '10px', borderRadius: '15px' }}></LinearProgress>
      </Box>
    </>
  );
}