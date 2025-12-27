import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';
import { requireAuthorization } from '../store/action';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TOKEN_KEY = 'six-cities-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        store.dispatch(requireAuthorization('NO_AUTH'));
      }
      return Promise.reject(error);
    }
  );

  return api;
};

