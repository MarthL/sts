import { axiosClient } from "./axios";
import { ProjectsProps } from "../components/templates/HomePage/HomePage";

export function getProjects() {
  return axiosClient.get('/projects')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    console.log(error);
  });
}

export function postProject(data: ProjectsProps) {
  return axiosClient.post('/projects')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}