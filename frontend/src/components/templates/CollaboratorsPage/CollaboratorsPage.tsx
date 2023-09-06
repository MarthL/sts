import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar } from '@mui/material';
import { UserListCustom } from '../../molecules/UserListCustom/UserListCustom';
import { getAllUsers } from '../../../api/users';

interface User {
  username: string,
}

export const CollaboratorsPage: React.FC = () => {

  const [userCollection, setUserCollection] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(async (res) => {
      setUserCollection(res);
    })
  }, [])

  console.log(userCollection);

  return (
    <>

      <Typography variant="h3" color="initial">Collaborators List</Typography>
      <List sx={{ width: '100%', flexWrap: 'wrap' }}>
        {userCollection.map((user) =>
          <UserListCustom username={user.username as string} avatar="none" />
        )}
      </List >
    </>
  )
}