import { axiosClient } from "./axios";

export async function getJobCollection() {
  return axiosClient.get('cities').then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}