import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { exportProjectPicture } from '../../../api/projects';

interface CardProjectProps {
  id: number;
  project_name: string;
  description: string;
  photo_url: string | undefined;
}

export const CardProject: React.FC<CardProjectProps> = (props: CardProjectProps) => {

  const { id, project_name, description, photo_url } = props;

  const [photo, setPhoto] = React.useState<string | undefined>('');

  useEffect(() => {
    if (photo_url) {
      exportProjectPicture(photo_url).then((res) => {
        setPhoto(res);
      })
    }
  }, [])

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={photo || "https://picsum.photos/500/300"}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}>{project_name}</Typography>
          <Typography variant="body1" sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}>{description}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/project/${id}`}>
            <Button size="small" variant="contained"> Learn More </Button>
          </Link>

        </CardActions>
      </Card>
    </>
  )
}