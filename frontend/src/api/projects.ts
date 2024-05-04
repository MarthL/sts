import { axiosClient } from "./axios";

export interface Project {
  id: number;
  project_name: string;
  description: string;
  photo_url?: string;
};

export async function getProjects(search?: string) {
  const param = search ? `?search=${search}` : ''
  return axiosClient.get('projects' + param)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    console.error(error);
  });
}

export async function getProjectById(id: number) {
  return axiosClient.get(`projects/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error);
    })
}

export async function postProject(data: Project) {
  return axiosClient.post('/projects', {
    project_name: data.project_name,
    description: data.description
  })
    .then((response) => {
      console.error('response.data : ', response.data)
      if(response.data.file) {
        editProjectPicture(response.data.id, response.data.project_picture)
      }
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    })
}

export async function editProjectPicture(id: number, data: File) {
  const formData = new FormData();
  formData.append('file', data);
  formData.append('fileName', data.name);
  const fileName = data.name;
  const type = data.type;
  return axiosClient.post('projects/' + id + '/project-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error)
    })
}

export async function exportProjectPicture(projectPicture: string) {
  return axiosClient.get(`/uploads/project-photo/${projectPicture}`, { responseType: 'blob' })
    .then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    })
    .catch((error) => {
      console.error(error);
      return '';
    })
}