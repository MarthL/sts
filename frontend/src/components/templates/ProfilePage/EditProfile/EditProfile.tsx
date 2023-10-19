import { Typography, TextField } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import { Input } from '@mui/material';
import { CustomInput } from '../../../atoms/InputForm/CustomInput';

interface User {
  id: number,
  username: string,
  family_name: string,
  password: string,
  job: {
    id: number,
    job_title: string,
  }
}

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  console.log(user)
  return (
    <>
      <Typography variant="h5" marginLeft={3}>Edit Profile</Typography>
      <Grid container marginLeft={3}>

        <Grid item xs={2}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <Avatar sx={{ width: '90px', height: '90px' }} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={4} marginTop={5}>
          <TextField type='text' label={'First Name'} fullWidth value={user?.username} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5} marginTop={5}>
          <TextField type='text' label={'Last Name'} fullWidth value={user?.family_name} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" label={"Position"} fullWidth sx={{ margin: 'auto' }} value={user?.job.job_title} />
        </Grid>
        <Grid item xs={3}></Grid>


        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" label={"Email"} fullWidth sx={{ margin: 'auto' }} />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" label={"Contact Number"} fullWidth sx={{ margin: 'auto' }} />
        </Grid>
        <Grid item xs={3}></Grid>


        <Grid item xs={9} marginBottom={5}>
          <TextField type="text" label={"Address"} fullWidth sx={{ margin: 'auto' }} />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={4}>
          <TextField type='text' label={'City'} fullWidth />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5}>
          <TextField type='text' label={'State'} fullWidth />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={4}>
          <TextField type='text' label={'Zip Code'} fullWidth />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} marginBottom={5}>
          <TextField type='text' label={'Country'} fullWidth />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

      </Grid >
    </>
  )

}