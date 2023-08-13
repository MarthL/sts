import { axiosClient } from "./axios";

export function getProjects() {
  return axiosClient.get('/projects')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    console.log(error);
  });
}