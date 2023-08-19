import { axiosClient } from "./axios";

export function logIn(username: FormDataEntryValue, password: FormDataEntryValue) {
  const data = new FormData();
  data.append('username', username);
  data.append('password', password);

  return axiosClient
    .post('/users/login', data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}