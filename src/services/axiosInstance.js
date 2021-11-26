import axios from 'axios';
const baseURL = 'http://localhost:8081/api';

const token = (path) => path.startsWith('auth/') ?
  {} :
  { authorization: localStorage.auth };

const axios_api = axios.create({
  baseURL,
});

const request = (method, endpoint, data, params) =>
  axios_api({
    method,
    url: endpoint,
    data,
    headers: token(endpoint),
    params
  });

const containStatus = (actualStatus, listStatus) => listStatus.some(statusCode => statusCode === actualStatus);
const isUnauthorized = (status) => containStatus(status, [401, 403]);
const isControlledError = (status) => containStatus(status, [400, 402, 404, 409]);

axios_api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (!error.response) {
      window.location = "/error";
    } else {
      const status = error.response.status;
      if (isUnauthorized(status)) {
        localStorage.clear();
        window.location = '/';
      } else if (isControlledError(status)) {
        return Promise.reject(error);
      } else {
        window.location = `/error?status=${status}&msg=Error de servidor inesperado`;
      }
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