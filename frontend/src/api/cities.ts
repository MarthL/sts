import { axiosClient } from "./axios";

export interface City {
  id: number,
  city_name: string,
  zip_code: string,
  state: string,
}

interface CitiesCollection {
  cities: City[]
}

export async function getCitiesCollection() {
  return axiosClient.get('citys').then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
  })
}