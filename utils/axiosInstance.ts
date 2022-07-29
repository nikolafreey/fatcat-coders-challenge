import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/',
  responseType: 'json',
  headers: { 'Content-type': 'application/json', Accept: 'application/json' },
});
