import React, { useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { UserListCustom } from '../../molecules/UserListCustom/UserListCustom';
import { getAllUsers } from '../../../api/users';
// import { User } from '../../../api/users';

export const ClientsPage: React.FC = () => {

  const [clientsColleciton, setClientsCollection] = useState<any[]>([]);

  useEffect(() => {
    getAllUsers().then(async (res) => {
      setClientsCollection(res);
    })
  }, [])

  return (
    <>
      <Typography variant="h3">Collaborators List</Typography>
      <List sx={{ width: '100%', flexWrap: 'wrap' }}>
        {clientsColleciton.map((client) =>
          client?.name
        )}
      </List >
    </>
  )
}