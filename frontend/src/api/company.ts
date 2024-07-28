import { axiosClient } from "./axios";

export async function getCompanys(search?: string) {
  const param = search ? `?search=${search}` : '' 
  return axiosClient.get('company' + param)
  .then((response) => {
    return response.data;
  })
  .catch((error) => { 
    console.error(error)
  });
}