import { axiosClient } from "./axios";
import { City } from '../api/cities';

export interface User {
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
  city?: City,
  profile_picture: string,
}

export async function getUserLogged(username: string) {
  return axiosClient.get(`/users/loggedUser/${username}`)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
  console.log(error);
});
}

export async function getAllUsers(search?: string) {
  const param = search ? `?search=${search}` : '' 
  return axiosClient.get('users' + param)
  .then((response) => {
    return response.data;
  })
  .catch((error) => { 
    console.log(error)
  })
}

export async function getUserById(id: number) {
  return axiosClient.get(`users/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error);
    })
}

export async function editUser(id: number, data: any) {
  return axiosClient.patch('users/' + id, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function editProfilePicture(id: number, data: File) {
  console.log('start function : ', data)
  const formData = new FormData();
  formData.append('file', data);
  formData.append('fileName', data.name);
  console.log('data :', data);
  const fileName = data.name;
  const type = data.type;
  return axiosClient.post('users/' + id + '/profile-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function exportProfilePicture(profilePicture: string) {
  return axiosClient.get(`/uploads/${profilePicture}`, { responseType: 'blob' })
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    })
    .catch((error) => {
      console.error(error);
      return '';
    })
}
