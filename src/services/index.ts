import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/v1',
  timeout: 10_000,
});
