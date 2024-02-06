import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { getUserLogged } from '../../../api/users';
import { Edit, Tune, Security } from '@mui/icons-material';
import { ListItemProfile } from '../../molecules/ListItemProfile.tsx/ListItemProfile';
import { EditProfile } from './EditProfile/EditProfile';
import { SecurityPassword } from './SecurityPassword/SecurityPassword';

interface User {
  id: number,
  username: string,
  family_name: string,
  password: string,
  yop: number,
  email: string,
  phone_number: string,
  job: {
    id: number,
    job_title: string,
  },
  city:{
    id: number,
    city_name: string,
    zip_code: number,
    state: number,
  },  
  address: string,  
}

export const ProfilePage: React.FC<any> = () => {

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const username = localStorage.getItem('name');
    if (username) {
      getUserLogged(username)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const componentToRender = [
    <EditProfile user={user} />,
    <SecurityPassword user={user} />
  ];


  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Paper elevation={0}
            variant="outlined">
            <ListItemProfile icon={<Edit />} text={'Edit Profile'} index={1} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}></ListItemProfile>
            <ListItemProfile icon={<Security />} text={'Security and Password'} index={2} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}></ListItemProfile>
            <ListItemProfile icon={<Tune />} text={'Advanced Settings'} index={3} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}></ListItemProfile>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={0} variant="outlined">
            {componentToRender[selectedIndex - 1]}
          </Paper>
        </Grid>
      </Grid >
    </>
  )
}