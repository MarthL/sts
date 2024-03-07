import { axiosClient } from "./axios";

export interface Link {
  id: number,
  url: string
}

interface LinksCollection {
  Links: Link[]
}

export async function getLinksCollection(search?: string) {
  const param = search ? `?search=${search}` : ''
  return axiosClient.get('links' + param)
  .then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}

export async function postLink(data: Link) {
  return axiosClient.post('/links', {
    url: data.url
  })
    .then((response) => {
      console.log('response.data : ', response.data)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}

export async function patchLink(id: number, data: any) {
  return axiosClient.patch('links/' + id, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error)
    })
}