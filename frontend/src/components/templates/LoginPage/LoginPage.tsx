import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box, Link, Grid, Paper, Avatar } from '@mui/material';
import { Waves } from '../../molecules/Waves/Waves';
import logo from './../../../assets/img/black_logo.png';
import { logIn } from '../../../api/login';

export const LoginPage = () => {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;

    if (email !== null && password !== null) {
      logIn(email, password)
        .then((res: any) => {
          if (res.status === 201) {
            localStorage.setItem('token', res.data.accessToken.accessToken);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ margin: '25px', padding: '25px' }}>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={logo} sx={{ height: '80px', width: '80px', marginBottom: '15px' }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Waves />

    </>
  )
}



