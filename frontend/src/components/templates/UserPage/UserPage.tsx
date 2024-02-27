import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, getUserById } from './../../../api/users'

export const UserPage: React.FC<any> = () => {

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (id !== undefined) {
      getUserById(parseInt(id)).then((res) => {
        setUser(res);
      })
    }
  }, []);

  return (
    <>
      <Typography> it works !  </Typography>
    </>
  )
}