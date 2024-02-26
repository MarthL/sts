import { axiosClient } from "./axios";

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

export async function editUser(id: number, data: any) {
  return axiosClient.patch('users/' + id, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    })
}
