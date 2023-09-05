import React from 'react';
import { ListItem, ListItemAvatar, Typography, Avatar, ListItemText } from '@mui/material';

interface UserListProps {
  avatar: string;
  username: string;
}

export const UserListCustom = (props: UserListProps) => {

  const { avatar, username } = props;

  return (
    <>
      <ListItem sx={{ width: '100%', border: 'solid 1px black', marginBlock: '10px' }}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="body1">
            {username}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  )
}