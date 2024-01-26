import { Typography, TextField, Button, MenuItem, Grid, Select, Avatar } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { editUser } from '../../../../api/users';
import { getJobCollection } from '../../../../api/jobs';
import Swal from 'sweetalert2';
import { InputProfileCustom } from '../../../atoms/InputForm/InputProfileCustom';

interface Job {
  id: number;
  job_title: string;
}

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
  },
  country: string,
  city: string,
  state: number,
  address: string,
  zip_code: number
}

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  // const { register,  } = useForm({
  //   defaultValues: {},
  // });


  const [id, setId] = useState(user?.id);
  const [username, setUsername] = useState(user?.username);
  const [familyName, setFamilyName] = useState(user?.family_name);
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [yop, setYop] = useState(user?.yop);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone_number);
  const [jobCollection, setJobCollection] = useState<Job[]>([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState(0);
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState(0);

  console.log(user)


  useEffect(() => {
    if (user) {
      setId(user.id);
      user?.username ? setUsername(user.username) : setUsername('');
      setFamilyName(user.family_name ? user.family_name : '')
      setJob(user.job ? user.job as Job : undefined);
      setYop(user?.yop ? user.yop : 0);
      setEmail(user?.email ? user.email : '');
      setPhone(user?.phone_number ? user.phone_number : '');
      setCountry(user?.country ? user.country : '');
      setCity(user?.city ? user.city : '');
      setState(user?.state ? user.state : 0);
      setAddress(user?.address ? user.address : '');
      setZip(user?.zip_code ? user?.zip_code : 0);
    }
  }, [user]);

  useEffect(() => {
    getJobCollection().then(async (res) => {
      setJobCollection(res);
    })
  }, [])


  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(event.target.value);
  }

  const handleYopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event :', event.target.value)
    !parseInt(event.target.value) ? setYop(0) : setYop(parseInt(event.target.value));
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  }

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !parseInt(event.target.value) ? setState(0) : setState(parseInt(event.target.value));
  }


  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !parseInt(event.target.value) ? setZip(0) : setZip(parseInt(event.target.value));
  }

  const methods = useForm();
  const onsubmit = async (data: any) => {
      const userHasConfirmed = await confirmModal();
      if (userHasConfirmed) {
        user?.id ? sendForm(user.id, data) : console.error(`Datas :  ${data} cannot be send, missing id user`)
      }
    }

  //const { register, handleSubmit } = useForm();

  const sendForm = (id: number, data: any) => {
    console.log(data);
    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      if (data[key] !== '') {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    editUser(id, filteredData)
  }

  const confirmModal = async (): Promise<Boolean> => {
    return Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        return true;
      } else {
        Swal.fire("Changes are not saved", "", "info");
        return false;
      }
    });
  }

  return (
    <>
      <Typography variant="h5" marginLeft={3}>Edit Profile</Typography>
      <FormProvider {...methods}>
        <Grid container marginLeft={3} component={'form'}
          // onSubmit={handleSubmit(async (data: any) => {
          //   const userHasConfirmed = await confirmModal();
          //   if (userHasConfirmed) {
          //     user?.id ? sendForm(user.id, data) : console.error(`Datas :  ${data} cannot be send, missing id user`)
          //   }
          // })}
          onSubmit={methods.handleSubmit(onsubmit)}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Avatar sx={{ width: '90px', height: '90px' }} />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={4} marginTop={5}>
            {/* <TextField */}
              {/* fullWidth
              disabled
              type='text'
              {...register("username")}
              label={'Username'}
              value={username}
              onChange={handleUserNameChange}
              InputLabelProps={{ shrink: true }}

            /> */}
            {/* <InputProfileCustom
              type="text"
              label={'Username'}
              value={username}
              fullWidth={true}
              disabled={true}
              onChange={handleUserNameChange}
              
            /> */}
            <InputProfileCustom
              label={'Username'}
              type="text"
              value={username}
              onChange={handleUserNameChange}
              disabled={false}
              registerProps={"username"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5} marginTop={5}>
            {/* <TextField type='text'
              {...register("family_name")}
              label={'Last Name'}
              fullWidth
              value={familyName}
              onChange={handleFamilyNameChange}
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Last Name'}
              type="text"
              value={familyName}
              onChange={handleFamilyNameChange}
              disabled={false}
              registerProps={"family_name"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={9} marginBottom={5}>
            <Select
              //{...register('job')}
              label="Position"
              fullWidth
              value={job?.id ? job.id.toString() : ''}
              onChange={(event) => {
                const selectedJobId = event.target.value;
                const selectedJob = jobCollection.find((j) => j.id === parseInt(selectedJobId, 10));
                setJob(selectedJob);
              }}
            >
              {jobCollection.map((job) => (
                <MenuItem key={job.id} value={job.id.toString()}>
                  {job.job_title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={9} marginBottom={5}>
            {/* <TextField
              fullWidth
              type="text"
              {...register("yop")}
              value={yop}
              onChange={handleYopChange}
              label={"Years of XP"}
              sx={{ margin: 'auto' }}
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Years of XP'}
              type="text"
              value={yop}
              onChange={handleYopChange}
              disabled={false}
              registerProps={"yop"}
            />
          </Grid>
          <Grid item xs={3}></Grid>


          <Grid item xs={9} marginBottom={5}>
            {/* <TextField
              type="text"
              {...register("email")}
              value={email}
              onChange={handleEmailChange}
              label={"Email"}
              fullWidth
              sx={{ margin: 'auto' }}
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Email'}
              type="text"
              value={email}
              onChange={handleEmailChange}
              disabled={false}
              registerProps={"email"}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={9} marginBottom={5}>
            {/* <TextField type="text"
              {...register("phone_number")}
              value={phone}
              onChange={handlePhoneChange}
              label={"Contact Number"}
              fullWidth sx={{ margin: 'auto' }}
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Contact Number'}
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              disabled={false}
              registerProps={"phone_number"}
            />
          </Grid>
          <Grid item xs={3}></Grid>


          <Grid item xs={9} marginBottom={5}>
            {/* <TextField
              type="text"
              {...register("address")}
              label={"Address"}
              value={address}
              fullWidth
              sx={{ margin: 'auto' }}
              InputLabelProps={{ shrink: true }}
              onChange={handleAddressChange}
            /> */}
            <InputProfileCustom
              label={'Address'}
              type="text"
              value={address}
              onChange={handleAddressChange}
              disabled={false}
              registerProps={"address"}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={4}>
            {/* <TextField type="text"
              {...register("city")}
              label={'City'}
              value={city}
              onChange={handleCityChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Last Name'}
              type="text"
              value={familyName}
              disabled={false}
              registerProps={"family_name"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5}>
            {/* <TextField type="text"
              {...register("state")}
              label={'State'}
              value={state}
              onChange={handleStateChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'State'}
              type="text"
              value={state}
              onChange={handleStateChange}
              disabled={false}
              registerProps={"state"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={4}>
            {/* <TextField type="text"
              {...register("zip_code")}
              label={'Zip Code'}
              fullWidth
              value={zip}
              onChange={handleZipChange}
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Zip Code'}
              type="text"
              value={zip}
              onChange={handleZipChange}
              disabled={false}
              registerProps={"zip_code"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5}>
            {/* <TextField type="text"
              {...register("country")}
              label={'Country'}
              value={country}
              onChange={handleCountryChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            /> */}
            <InputProfileCustom
              label={'Country'}
              type="text"
              value={country}
              onChange={handleCountryChange}
              disabled={false}
              registerProps={"country"}
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
              Save
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>

        </Grid >
      </FormProvider>
    </>
  )

}