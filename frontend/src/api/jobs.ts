import { axiosClient } from "./axios";

export async function getJobCollection() {
  return axiosClient.get('jobs').then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}