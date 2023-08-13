import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';

interface CardProjectProps {
  key: number;
  name: string;
  description: string;
}

export const CardProject = (props: CardProjectProps) => {
  const { name, description, key } = props;
  return (
    <>
      <Card sx={{ maxWidth: 350, height: 350 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://picsum.photos/500/300"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" color="initial" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}>{name}</Typography>
          <Typography variant="body1" color="initial" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}>{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained"> Learn More </Button>
        </CardActions>
      </Card>
    </>
  )
}