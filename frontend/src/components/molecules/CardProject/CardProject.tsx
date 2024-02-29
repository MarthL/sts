import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CardProjectProps {
  id: number;
  project_name: string;
  description: string;
}

export const CardProject: React.FC<CardProjectProps> = (props: CardProjectProps) => {
  const { id, project_name, description } = props;
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="194"
          image="https://picsum.photos/500/300"
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