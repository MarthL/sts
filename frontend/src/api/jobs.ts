import { axiosClient } from "./axios";

export interface Job {
  id: number;
  job_title: string;
}

export async function getJobCollection() {
  return axiosClient.get('jobs').then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}