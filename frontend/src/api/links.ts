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

export async function getLinkById(id: number) {
  return axiosClient.get(`links/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    })
}

// export async function getLinkByUrl(url: string) {
//   return axiosClient.get(`links/${url}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("Il n'y a pas cet url");
//     })
// }

export async function postLink(data: any) {
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