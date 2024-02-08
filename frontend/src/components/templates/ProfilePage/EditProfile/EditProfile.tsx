import { Typography, Button, Grid, Avatar, Select, MenuItem } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectInputCustom } from '../../../atoms/InputForm/SelectInputCustom';
import { useState, useEffect } from 'react';
import { editUser } from '../../../../api/users';
import { getJobCollection } from '../../../../api/jobs';
import { getCitiesCollection } from '../../../../api/cities';
import Swal from 'sweetalert2';
import { InputProfileCustom } from '../../../atoms/InputForm/InputProfileCustom';

interface Job {
  id: number;
  job_title: string;
}

interface City {
  id: number,
  city_name: string,
  zip_code: number,
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
  city?: {
    id?: number,
    city_name?: string,
    zip_code?: number,
  },
  address: string,
}

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  const [id, setId] = useState(user?.id);
  const [username, setUsername] = useState(user?.username ?? '');
  const [familyName, setFamilyName] = useState(user?.family_name ?? '');
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [jobCollection, setJobCollection] = useState<Job[]>([]);
  const [yop, setYop] = useState(user?.yop ?? 0);
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone_number ?? '');
  const [city, setCity] = useState<City | undefined>(undefined);
  const [cityCollection, setCityCollection] = useState<City[]>([])
  const [address, setAddress] = useState(user?.address ?? '')
  //const [state, setState] = useState('');
  //const [zip, setZip] = useState('');


  useEffect(() => {
    if (user) {
      setId(user.id);
      user?.username ? setUsername(user.username) : setUsername('');
      setFamilyName(user.family_name ? user.family_name : '')
      setYop(user?.yop ? user.yop : 0);
      setEmail(user?.email ? user.email : '');
      setPhone(user?.phone_number ? user.phone_number : '');
      setJob(user.job ? user.job as Job : undefined);
      setCity(user?.city ? user.city as City : undefined);
      //setState(user?.city.state ? user.city.state as City : undefined);
      setAddress(user?.address ? user.address : '');
      //setZip(user?.city.zip_code ? user?.city.zip_code as City : undefined);
    }
  }, [user]);

  useEffect(() => {
    getJobCollection().then(async (res) => {
      setJobCollection(res);
      console.log('job collection : ', jobCollection)
    });
  }, []);

  useEffect(() => {
    getCitiesCollection().then(async (res: any) => {
      setCityCollection(res)
      console.log('city collection : ', cityCollection)
    });
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

  // const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCity(event.target.value);
  //   console.log(city)
  // }

  //const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  !parseInt(event.target.value) ? setState('') : setState((event.target.value));
  //}


  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  //const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  !parseInt(event.target.value) ? setZip('') : setZip((event.target.value));
  //}

  const methods = useForm();
  const onsubmit = async (data: any) => {
    const userHasConfirmed = await confirmModal();
    if (userHasConfirmed) {
      user?.id ? sendForm(user.id, data) : console.error(`Datas :  ${data} cannot be send, missing id user`)
    }
  }


  const sendForm = (id: number, data: any) => {
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
            <InputProfileCustom
              label={'Username'}
              type="text"
              value={username}
              onChangeEvent={handleUserNameChange}
              disabled={true}
              registerProps={"username"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5} marginTop={5}>
            <InputProfileCustom
              label={'Last Name'}
              type="text"
              value={familyName}
              onChangeEvent={handleFamilyNameChange}
              disabled={false}
              registerProps={"family_name"}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={9} marginBottom={5}>
            <SelectInputCustom
              label={'Position'}
              registerProps={'job'}
              value={job?.id ? job.id.toString() : ''}
              setValue={setJob}
              collection={jobCollection}
            />
          </Grid>

          <Grid item xs={9} marginBottom={5}>
            <SelectInputCustom
              label={'City'}
              registerProps={'city'}
              value={city?.id ? city.id.toString() : ''}
              setValue={setCity}
              collection={cityCollection}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={9} marginBottom={5}>
            <InputProfileCustom
              label={'Years of XP'}
              type="text"
              value={yop}
              onChangeEvent={handleYopChange}
              disabled={false}
              registerProps={"yop"}
            />
          </Grid>
          <Grid item xs={3}></Grid>


          <Grid item xs={9} marginBottom={5}>
            <InputProfileCustom
              label={'Email'}
              type="text"
              value={email}
              onChangeEvent={handleEmailChange}
              disabled={false}
              registerProps={"email"}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={9} marginBottom={5}>
            <InputProfileCustom
              label={'Contact Number'}
              type="text"
              value={phone}
              onChangeEvent={handlePhoneChange}
              disabled={false}
              registerProps={"phone_number"}
            />
          </Grid>
          <Grid item xs={3}></Grid>


          <Grid item xs={9} marginBottom={5}>
            <InputProfileCustom
              label={'Address'}
              type="text"
              value={address}
              onChangeEvent={handleAddressChange}
              disabled={false}
              registerProps={"address"}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={4}>
            {/* <InputProfileCustom
              label={'City'}
              type="text"
              value={city}
              onChangeEvent={handleCityChange}
              disabled={false}
              registerProps={"city"}
            /> */}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5}>
            {/* <InputProfileCustom
              label={'State'}
              type="text"
              value={state}
              onChangeEvent={handleStateChange}
              disabled={false}
              registerProps={"state"}
            /> */}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={4}>
            {/* <InputProfileCustom
              label={'Zip Code'}
              type="text"
              value={zip}
              onChangeEvent={handleZipChange}
              disabled={false}
              registerProps={"zip_code"}
            /> */}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4} marginBottom={5}></Grid>
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

        </Grid>
      </FormProvider>
    </>
  )

}