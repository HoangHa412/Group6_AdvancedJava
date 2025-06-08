import axios from "axios";
import { toast } from "react-toastify";

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const _axios = axios.create();

const configure = () => {
  // Add a request interceptor
  _axios.interceptors.request.use(
    function (config) {
      // Get token from local storage or wherever it's stored
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      else {
        reForwardToLogin();
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  _axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

function reForwardToLogin() {
  toast.warning("Phiên đăng nhập hết hạn, vui lòng đăng nhập để sử dụng phần mềm!");
  window.location.href = "/login";
}

const getAxiosClient = () => _axios;

export default {
  HttpMethods,
  configure,
  getAxiosClient,
}
