import axios from 'axios';
import { message } from 'antd';

axios.interceptors.request.use((config) => {
  // Do something before request is sent
  return {
    ...config,
    params: {
      ...config?.params,
      timestamp: Date.now(),
    },
  };
});

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error?.response) {
      message.error(error.response.data.message);
    }

    if (error?.response?.status === 401) {
      // Go to log in;
    }

    return Promise.reject(error?.message);
  },
);

const restApi = {
  get: (url, config) => {
    return axios.get(url, config);
  },
  delete: (url, config) => {
    return axios.delete(url, config);
  },
  post: (url, data, config) => {
    return axios.post(url, data, config);
  },
  put: (url, data, config) => {
    return axios.put(url, data, config);
  },
};

export default restApi;
