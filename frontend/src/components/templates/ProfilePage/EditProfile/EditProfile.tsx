import React from 'react';
import { Button, Grid, Avatar } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectInputCustom } from '../../../atoms/InputForm/SelectInputCustom';
import { useState, useEffect } from 'react';
import { editUser } from '../../../../api/users';
import { getJobCollection } from '../../../../api/jobs';
import { getCitiesCollection } from '../../../../api/cities';
import { getLinksCollection, getLinkById, postLink, patchLink } from '../../../../api/links';
import Swal from 'sweetalert2';
import { InputProfileCustom } from '../../../atoms/InputForm/InputProfileCustom';
import { CustomAutoComplete } from '../../../atoms/InputForm/CustomAutoComplete';

interface Job {
  id: number;
  job_title: string;
}

interface City {
  id: number;
  city_name: string,
  state: number,
  zip_code: number
}

interface Link {
  id: number,
  url: string
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
  city?: City,
  link?: Link
}

interface EditProfileProps {
  user: User | undefined;
}

export const EditProfile: React.FC<EditProfileProps> = ({ user }) => {

  const [id, setId] = useState(user?.id);
  const [username, setUsername] = useState(user?.username);
  const [familyName, setFamilyName] = useState(user?.family_name);
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [yop, setYop] = useState(user?.yop);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone_number);
  const [jobCollection, setJobCollection] = useState<Job[]>([]);
  const [city, setCity] = useState<City | null>(user?.city || null);

  // valeur du link
  const [link, setLink] = useState<Link | null>(user?.link || null);
  // valeur du label
  const [linkInput, setLinkInput] = useState<string | null>(user?.link?.url || null);

  const [cityCollection, setCityCollection] = useState<City[]>([]);
  const [linkCollection, setLinkCollection] = useState<Link[]>([]);

  useEffect(() => {
    if (user) {
      setId(user.id);
      user?.username ? setUsername(user.username) : setUsername('');
      setFamilyName(user.family_name ? user.family_name : '')
      setJob(user.job ? user.job as Job : undefined);
      setYop(user?.yop ? user.yop : 0);
      setEmail(user?.email ? user.email : '');
      setPhone(user?.phone_number ? user.phone_number : '');
      setCity(user?.city || null);
      setLink(user?.link || null);
      setLinkInput(user?.link?.url || null); // Me permet d'afficher la value de l'input
    }
  }, [user, cityCollection]);

  useEffect(() => {
    getJobCollection().then(async (res) => {
      setJobCollection(res);
    })
    getCitiesCollection().then(async (res) => {
      setCityCollection(res);
    })
    getLinksCollection().then(async (res) => {
      setLinkCollection(res);
    })
  }, [])

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleFamilyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(event.target.value);
  }

  const handleYopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !parseInt(event.target.value) ? setYop(0) : setYop(parseInt(event.target.value));
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  }

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(event.target.value);
  }

  const methods = useForm();
  const onsubmit = async (data: any) => {

    const newData = () => {
      let i = 0;
      for (var value in data) {
        if (data[value] == '' || data[value] == undefined) {
          delete data[value];
        }
        i += 1;
      }
      return data;
    }

    const userHasConfirmed = await confirmModal();
    if (userHasConfirmed) {
      user?.id ? sendForm(user.id, newData()) : console.error(`Datas :  ${data} cannot be send, missing id user`)
    }
  }

  const sendForm = async (id: number, data: any) => {

    // console.log(linkInput et link, tu verras que ce sont deux choses différentes)
    if (linkInput) {
      console.log(linkInput, 'link : ', link);
      if (link?.id) { // Si le lien existe déjà, recuperer le lien avec getLinkById
        getLinksCollection(link.url)
          .then(() => {
            console.log('Link getting successfully.', link.url);
          })
          .catch((error) => {
            console.error('Error getting link:', error);
          });
        patchLink(link.id, data)
          .then((response) => {
            console.log('Link patching successfully', response.data)
          })
          .catch((error) => {
            console.error('Error patching link:', error);
          });
      } else {
        // Si le lien n'existe pas, ajoutez-le à la base de données avec postLink
        postLink({ url: linkInput })
          .then((response: Link) => {
            setLink(response); // Mettre à jour l'état link avec le nouveau lien ajouté
            console.log('New link added successfully:', response);
          })
          .catch((error) => {
            console.error('Error adding new link:', error);
          });
      }
      // Mettre à jour la valeur de link_id dans les données à envoyer au serveur
      data.link_id = link?.id || undefined;
      delete data.link;
    }

    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      if (data[key] !== '') {
        acc[key] = data[key]
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
      }
      else {
        Swal.fire("Changes are not saved", "", "info");
        return false;
      }
    });
  }

  return (
    <>
      <FormProvider {...methods}>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} component={'form'}
          onSubmit={methods.handleSubmit(onsubmit)}
        >
          <Grid item xs={12} mt={5}>
            <Avatar sx={{ width: '90px', height: '90px' }} />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
            <Grid item xs={5} mt={5}>
              <InputProfileCustom
                label={'Username'}
                type="text"
                value={username}
                onChangeEvent={handleUserNameChange}
                disabled={true}
                registerProps={"username"}
              />
            </Grid>

            <Grid item xs={5} sx={{ mb: 5, mt: 5, width: '50%' }}>
              <InputProfileCustom
                label={'Last Name'}
                type="text"
                value={familyName}
                onChangeEvent={handleFamilyNameChange}
                disabled={false}
                registerProps={"family_name"}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }}>
            <SelectInputCustom
              label={'Position'}
              registerProps={'job'}
              value={job?.id ? job.id.toString() : ''}
              setValue={setJob}
              collection={jobCollection}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }} >
            <InputProfileCustom
              label={'Years of XP'}
              type="text"
              value={yop}
              onChangeEvent={handleYopChange}
              disabled={false}
              registerProps={"yop"}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }} >
            <InputProfileCustom
              label={'Email'}
              type="text"
              value={email}
              onChangeEvent={handleEmailChange}
              disabled={false}
              registerProps={"email"}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }} >
            <InputProfileCustom
              label={'Contact Number'}
              type="text"
              value={phone}
              onChangeEvent={handlePhoneChange}
              disabled={false}
              registerProps={"phone_number"}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }}>
            <CustomAutoComplete
              collection={cityCollection}
              label='City'
              registerProps={'city'}
              setValue={setCity}
              value={city || null}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 5, width: '50%' }} >
            <InputProfileCustom
              label={'Link'}
              type="text"
              value={linkInput || undefined}
              onChangeEvent={handleLinkChange}
              disabled={false}
              registerProps={"link"}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
            >
              Save
            </Button>
          </Grid>
        </Grid >
      </FormProvider>
    </>
  )
}