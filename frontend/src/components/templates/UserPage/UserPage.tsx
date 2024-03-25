import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, getUserById, getAllUsers } from './../../../api/users';
import { useNavigate } from 'react-router-dom';
import { TextBlock } from "../../atoms/TextBlock/TextBlock";

export const UserPage: React.FC<any> = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (id !== undefined && localStorage.getItem('id') !== id) {
      getUserById(parseInt(id)).then((res) => {
        setUser(res);
      })
    } else {
      navigate('/profile')
    }
  }, []);

  return (
    <> 

      <Typography> it works !  </Typography>
      
      <Grid container>
        <Grid item xs={12} sx={{mt:2}}>
          <TextBlock
            type="text"
            value="string"
            variant="outlined"
            rows={10}
            maxChars={500}
          />
        </Grid>
      </Grid>
      
    </>
  )
}