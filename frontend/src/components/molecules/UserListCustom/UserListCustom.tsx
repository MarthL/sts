import React, { ListItem, ListItemAvatar, Typography, Avatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../../../api/users';

interface UserListCustomProps {
  user: Partial<User>;
  username: string;
  id: number;
}

export const UserListCustom = (props: UserListCustomProps) => {

  const { username, id } = props;

  return (
    <>
      <ListItem sx={{ width: '100%', borderBottom: 1, marginBlock: '10px' }}>
        <Link to={`/users/${id}`}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>
            <Typography variant="body1">
              {username}
            </Typography>
          </ListItemText>
        </Link>
      </ListItem>
    </>
  )
}