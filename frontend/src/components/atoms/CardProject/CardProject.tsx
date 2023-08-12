import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';

export const CardProject = () => {
  return (
    <>
      <Card sx={{ minWidth: 250 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://picsum.photos/500/300"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h4" color="initial">Test</Typography>
          <Typography variant="body1" color="initial">Lorem ipsum dolor sit amet</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained"> Learn More </Button>
        </CardActions>
      </Card>
    </>
  )
}