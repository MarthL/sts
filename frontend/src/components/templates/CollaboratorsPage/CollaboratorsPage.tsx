import React, { useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { UserListCustom } from '../../molecules/UserListCustom/UserListCustom';
import { getAllUsers } from '../../../api/users';
import { User } from '../../../api/users';

export const CollaboratorsPage: React.FC = () => {

  const [userCollection, setUserCollection] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(async (res) => {
      setUserCollection(res);
    })
  }, [])

  return (
    <>
      <Typography variant="h3">Collaborators List</Typography>
      <List sx={{ width: '100%', flexWrap: 'wrap' }}>
        {userCollection.map((user) =>
          <UserListCustom
            id={user.id as number}
            key={user.id}
            username={user.username as string} 
            user={user as Partial<User>}
          />
        )}
      </List >
    </>
  )
}