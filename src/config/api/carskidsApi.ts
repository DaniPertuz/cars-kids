import axios from 'axios';
import { StorageAdapter } from '../adapters/storage-adapter';

const carskidsApi = axios.create({
  baseURL: 'https://cars-kids-be.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

carskidsApi.interceptors.request.use(
  async (config) => {
    const token = await StorageAdapter.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

export default carskidsApi;
