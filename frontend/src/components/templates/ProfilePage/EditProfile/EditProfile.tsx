import { Typography, TextField, Input, Button, Box, Grid, Avatar } from '@mui/material';
import { CustomInput } from '../../../atoms/InputForm/CustomInput';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { editUser } from '../../../../api/users';

// TODO :    defaultValue={this.props.val}
// onChange={handleChange}

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

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  const [id, setId] = useState(user?.id);
  const [username, setUsername] = useState(user?.username);
  const [familyName, setFamilyName] = useState(user?.family_name);
  const [job, setJob] = useState(user?.job?.job_title);
  const [yop, setYop] = useState(user?.yop);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone_number);

  useEffect(() => {
    if (user) {
      setId(user.id);
      user?.username ? setUsername(user.username) : setUsername('');
      setFamilyName(user.family_name ? user.family_name : '')
      setJob(user.job?.job_title ? user.job.job_title : '');
      setYop(user?.yop ? user.yop : 0);
      setEmail(user?.email ? user.email : '');
      setPhone(user?.phone_number ? user.phone_number : '');
    }
  }, [user]);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(event.target.value);
  }

  const handleJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJob(event.target.value);
  }

  const handleYopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYop(parseInt(event.target.value));
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  }

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Typography variant="h5" marginLeft={3}>Edit Profile</Typography>
      <Grid container marginLeft={3} component={'form'} onSubmit={handleSubmit((data) => user?.id ? editUser(user.id, data) : console.error(`Datas :  ${data} cannot be send, missing id user`))}>

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
          <TextField type='text'
            {...register("family_name")}
            label={'Last Name'}
            fullWidth
            value={familyName}
            onChange={handleFamilyNameChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text"
            {...register("job")}
            label={"Position"}
            fullWidth
            sx={{ margin: 'auto' }}
            value={job}
            onChange={handleJobChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField
            fullWidth
            type="text"
            {...register("yop")}
            value={yop}
            onChange={handleYopChange}
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
            value={email}
            onChange={handleEmailChange}
            label={"Email"}
            fullWidth
            sx={{ margin: 'auto' }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={9} marginBottom={5}>
          <TextField type="text"
            {...register("phone_number")}
            value={phone}
            onChange={handlePhoneChange}
            label={"Contact Number"}
            fullWidth sx={{ margin: 'auto' }}
            InputLabelProps={{ shrink: true }}
          />
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