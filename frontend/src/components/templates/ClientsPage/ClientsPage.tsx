import React, { useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { UserListCustom } from '../../molecules/UserListCustom/UserListCustom';
import { getCompanys } from '../../../api/company';
// import { User } from '../../../api/users';

export const ClientsPage: React.FC = () => {

  const [clientsColleciton, setClientsCollection] = useState<any[]>([]);

  useEffect(() => {
    getCompanys().then(async (res) => {
      setClientsCollection(res);
    })
  }, [])

  return (
    <>
      <Typography variant="h3">Company's List</Typography>
      <List sx={{ width: '100%', flexWrap: 'wrap' }}>
        {clientsColleciton.map((client) =>
          client?.name
        )}
      </List >
    </>
  )
}