import { axiosClient } from "./axios";

export function getCurrentUser() {
  return axiosClient.get('/users/currentuser')
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
  console.log(error);
});
}