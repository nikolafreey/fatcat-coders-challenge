import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.spacexdata.com/v4/',
  responseType: 'json',
  headers: { 'Content-type': 'application/json', Accept: 'application/json' },
});
