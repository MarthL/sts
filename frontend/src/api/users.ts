import { axiosClient } from "./axios";
import { City } from '../api/cities';

export interface User {
    id: number;
    username: string;
    password: string;
    family_name: string;
    yop: number;
    phone_number: string;
    email: string;
    address: string;
    job?: {
      id: number;
      job_title: string;
    },
    company?: string;
    city?: City
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

export async function editProfilePicture(id: number, data: any) {
  return axiosClient.patch('users/' + id + '/profile-photo', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error)
    })
}

// export async function getLoggedUser(id: number) {
//   return axiosClient.get('users/currentuser')
//     .then((response) => {
//       return response.data
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }
