import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';
import { StorageAdapter } from './storage-adapter';

interface Options {
  baseUrl: string;
  params: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await StorageAdapter.getItem('token');
    
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
    
        return config;
      }
    )
  }

  async get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);
      return data;
    } catch (error) {
      throw new Error(`Error fetching get ${url}: ${error}`);
    }
  }

  async post<T>(url: string, data?: any, options?: Record<string, unknown> | undefined): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data to ${url}: ${error}`);
    }
  }

  async put<T>(url: string, data?: any, options?: Record<string, unknown> | undefined): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating resource at ${url}: ${error}`);
    }
  }

  async delete<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting resource at ${url}: ${error}`);
    }
  }
}
