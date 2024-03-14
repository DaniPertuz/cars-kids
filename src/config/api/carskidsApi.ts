import { Platform } from 'react-native';
import axios from 'axios';
import { StorageAdapter } from '../adapters/storage-adapter';
import { API_URL as PROD_URL, API_URL_ANDROID, API_URL_IOS, STAGE } from '@env';

export const API_URL =
  (STAGE === 'prod')
    ? PROD_URL
    : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;

const carskidsApi = axios.create({
  baseURL: API_URL,
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
