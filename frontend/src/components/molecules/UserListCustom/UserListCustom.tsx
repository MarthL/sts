import React, { useState, useEffect } from 'react';
import { ListItem, Box, ListItemAvatar, Typography, Avatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { User, exportProfilePicture } from '../../../api/users';


interface UserListCustomProps {
  id: number;
  key: number;
  username: string;
  user: Partial<User>;
  profile_picture?: string;
}

export const UserListCustom = (props: UserListCustomProps) => {

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (profile_picture) {
      exportProfilePicture(profile_picture).then((url) => {
        setProfilePictureUrl(url);
      });
    }
  }, []);


  const { username, id, profile_picture } = props;

  return (
    <>
      <ListItem sx={{ width: '100%', marginBlock: '10px' }}>
        <Link to={`/users/${id}`}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar src={profilePictureUrl} />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body1">
                {username}
              </Typography>
            </ListItemText>
          </Box>
        </Link>
      </ListItem>
    </>
  )
}