import axios from "axios";
import { UNAUTH_USER } from "../redux/actions";

const successHandler = (response) => response;

const errorHandler = (err, store) => {
  // localStorage.clear();
  store.dispatch({ type: UNAUTH_USER });
  // window.location.href = "/pages/login";
  return Promise.reject(err);
};

const networkInterceptor = {
  setupInterceptors: (store) => {
    axios.interceptors.response.use(
      (res) => successHandler(res),
      (err) => errorHandler(err, store)
    );
  },
};

export default networkInterceptor;
