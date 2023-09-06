/* eslint-disable no-template-curly-in-string */
import { axiosClient } from "./axios";

export async function getUserLogged(username: any) {
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