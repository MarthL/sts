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

export async function getAllUsers() {
  return axiosClient.get('users')
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
      console.log(error);
    })
}

export async function editUser(id: number, data: any) {
  return axiosClient.patch('users/' + id, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    })
}
