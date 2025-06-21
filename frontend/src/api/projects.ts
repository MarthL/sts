import { axiosClient } from "./axios";
import { User } from "./users";

export interface Project {
  id: number;
  project_name: string;
  description: string;
  photo_url?: string;
  status?: string;
  progress?: number;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  location?: string;
  members?: [User];
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: null;
  participants?: number;
};

export type ProjectCreationData = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'photo_url' | 'members'>;

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

export async function createProject(data: ProjectCreationData) {
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