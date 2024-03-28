import { axiosClient } from "./axios";

export interface Status {
  id: number;
  statusName: string;
};

export async function getStatus(search?: string) {
  const param = search ? `?search=${search}` : ''
  return axiosClient.get('status' + param)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    console.log(error);
  });
}

export async function getStatusById(id: number) {
  return axiosClient.get(`status/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    })
}