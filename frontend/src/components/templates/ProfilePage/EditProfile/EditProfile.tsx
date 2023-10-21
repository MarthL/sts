import { Typography, TextField, Input, Button, Box, Grid, Avatar } from '@mui/material';
import { CustomInput } from '../../../atoms/InputForm/CustomInput';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

// TODO :    defaultValue={this.props.val}
// onChange={handleChange}

interface User {
  id: number,
  username: string,
  family_name: string,
  password: string,
  job?: {
    id?: number,
    job_title?: string,
  }
}

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  const [username, setUsername] = useState(user?.username);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Typography variant="h5" marginLeft={3}>Edit Profile</Typography>
      <Grid container marginLeft={3} component={'form'} onSubmit={handleSubmit((data) => console.log(data))}>

        <Grid item xs={2}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Avatar sx={{ width: '90px', height: '90px' }} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={4} marginTop={5}>
          <TextField
            fullWidth
            type='text'
            {...register("username")}
            label={'Username'}
            value={username}
            onChange={handleUserNameChange}
            InputLabelProps={{ shrink: true }}

          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5} marginTop={5}>
          <TextField type='text' {...register("family_name")} label={'Last Name'} fullWidth placeholder={user?.family_name} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text"
            {...register("job")}
            label={"Position"}
            fullWidth
            sx={{ margin: 'auto' }}
            placeholder={user?.job?.job_title ? user?.job.job_title : ''}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField
            fullWidth
            type="text"
            {...register("yop")}
            label={"Years of XP"}
            sx={{ margin: 'auto' }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={3}></Grid>


        <Grid item xs={9} marginBottom={5}>
          <TextField
            type="text"
            {...register("email")}
            label={"Email"}
            fullWidth
            sx={{ margin: 'auto' }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" {...register("phone")} label={"Contact Number"} fullWidth sx={{ margin: 'auto' }} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={3}></Grid>


        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" {...register("address")} label={"Address"} fullWidth sx={{ margin: 'auto' }} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={4}>
          <TextField type="text"
            {...register("city")}
            label={'City'}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5}>
          <TextField type="text"
            {...register("state")}
            label={'State'}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={4}>
          <TextField type="text"
            {...register("zip_code")}
            label={'Zip Code'}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5}>
          <TextField type="text"
            {...register("country")}
            label={'Country'}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={1}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginBottom: '25px' }}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>

      </Grid >
    </>
  )

}