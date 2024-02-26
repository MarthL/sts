import { axiosClient } from "./axios";

export interface Project {
  id: number;
  project_name: string;
  description: string;
};

export async function getProjects() {
  return axiosClient.get('/projects')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    console.log(error);
  });
}

export async function postProject(data: Project) {
  return axiosClient.post('/projects', {
    project_name: data.project_name,
    description: data.description
  })
    .then((response) => {
      console.log('response.data : ', response.data)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}