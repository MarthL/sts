import { axiosClient } from "./axios";

export async function getCitiesCollection() {
  return axiosClient.get('citys').then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}