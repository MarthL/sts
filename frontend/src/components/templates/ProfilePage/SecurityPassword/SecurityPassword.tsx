import { useState } from 'react';
import Typography from '@mui/material/Typography';

interface User {
  id: number,
  username: string,
  family_name: string,
  password: string,
  yop: number,
  email: string,
  phone_number: string,
  job?: {
    id?: number,
    job_title?: string,
  }
}

interface SecurityPasswordProps {
  user: User | undefined;
}

export const SecurityPassword: React.FC<SecurityPasswordProps> = ({ user }) => {


  return (
    <>
      <Typography variant="body1">Security</Typography>
    </>
  )

}