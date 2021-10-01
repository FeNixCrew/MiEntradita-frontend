import axios from 'axios';
const baseURL = 'http://localhost:8081/api';

const token = (path) => path.startsWith('auth/') ? 
                                              {} : 
                                              { authorization: localStorage.auth };

const axios_api = axios.create({
  baseURL
});

const request = (method, endpoint, data, params) =>
  axios_api({
    method,
    url: endpoint,
    data,
    headers: token(endpoint),
    params
  });

  
  axios_api.interceptors.response.use(
    (response) =>
    new Promise((resolve, _) => {
      resolve(response);
    }),
    (error) => {
      const status = error.response.status;
      
      const isUnauthorized = (status) => status === 403 || status === 401;

      if (isUnauthorized(status)) {
        localStorage.clear();
        window.location = '/';
      } else if (status === 400) {
        return new Promise((_, reject) => {
          reject(error);
        });
      } else {
        // TODO: pasarle el status code con el error
        window.location = '/error';
      }
    }
  );

const get = (url, params = {}) => request('get', url, {}, params)
const post = (endpoint, data = {}) => request('post', endpoint, data, {});

const axiosInstance = {
  get,
  post
};

export default axiosInstance;