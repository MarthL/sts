import React from 'react';
import { Grid, Avatar, Paper, Typography, Box } from '@mui/material';
import { ProgressProfile } from '../../molecules/ProgressProfile/ProgressProfile';

export const ProfilePage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={0} variant="outlined" sx={{ height: "80vh" }}>
            <Avatar
              alt="avatar"
              sx={{ bgcolor: '#F94C10', width: '100px', height: '100px', margin: '10px auto' }}
            >
            </Avatar>
            <Typography variant="h6" color="initial" align='center' fontWeight={'bold'}>John Doe</Typography>
            <Typography variant="body1" color="blue" align='center' fontWeight={'bold'}>UX Deisgner</Typography>
            <Typography variant="body2" color="initial" padding={2} textAlign={'center'} fontStyle={'italic'}>I am looking for some awesome project where I can contribute through creativity and cool stuff !</Typography>
            <Paper sx={{ margin: '0 10% 10px 10%' }}>
              <Typography variant="body2"> <Box component="span" fontWeight={'bold'}> Years Of XP: </Box> 2 </Typography>
              <Typography variant="body2"> <Box component="span" fontWeight={'bold'}> Daily Rate: </Box> 560 € </Typography>
              <Typography variant="body2"> <Box component="span" fontWeight={'bold'}> Location: </Box> New-York </Typography>
            </Paper>
          </Paper>

        </Grid>
        <Grid item xs={12} sm container spacing={2}>
          <Grid item xs={6}>
            <Paper variant="outlined" sx={{ height: '90%' }}>
              <Typography variant="body1" color="initial" padding={3}>Bio</Typography>
              <Typography variant="body2" color="initial" padding={3} textAlign={'justify'}>
                Designer graphique passionné par l'art de traduire des idées en visuels percutants. Avec [nombre] années d'expérience, je fusionne créativité et précision pour créer des designs fonctionnels et esthétiques. Chaque projet est une opportunité d'explorer de nouvelles perspectives, d'expérimenter avec les formes, les couleurs et les textures. Mon objectif est de captiver l'attention et de communiquer des messages clairs à travers mes créations. De la conception de logos distinctifs à la réalisation de supports de communication engageants, chaque détail compte. Ensemble, nous pouvons donner vie à vos visions et créer des visuels qui laissent une impression durable
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined">
              <Typography variant="body1" color="initial" padding={3}>Motivations</Typography>
              <ProgressProfile name="determinate" value={50}></ProgressProfile>
              <ProgressProfile name="management" value={30}></ProgressProfile>
              <ProgressProfile name="design" value={90}></ProgressProfile>
              <ProgressProfile name="WebDesign" value={30}></ProgressProfile>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined">Personality</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined">Bio2</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined">Goals</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper variant="outlined">Worked for this brands</Paper>
          </Grid>
        </Grid>
      </Grid >
    </>
  )
}