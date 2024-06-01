import { axiosClient } from "./axios";

// export interface Client {

// }

export async function  getClients(search?: string) {
  const param = search ? `?search=${search}` : '' 
  return axiosClient.get('clients' + param)
  .then((response) => {
    return response.data;
  })
  .catch((error) => { 
    console.error(error)
  });
}