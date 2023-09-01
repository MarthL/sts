import { axiosClient } from "./axios";

export async function getCurrentUser() {
  return axiosClient.get('/users/currentuser')
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