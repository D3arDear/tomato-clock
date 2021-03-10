import axios from "axios";
import { appID, appSecret } from "./_axiosHeader";
import history from "./history";

const instance = axios.create({
  baseURL: "https://tomatoserver.zealot.fun/",
  headers: {
    "t-app-id": appID,
    "t-app-secret": appSecret,
  },
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = xToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 获得 data 的时候
    response.headers["x-token"] &&
      localStorage.setItem("x-token", `${response.headers["x-token"]}`);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      history.push("/login");
      localStorage.removeItem("x-token");
    }
    return Promise.reject(error);
  }
);

export default instance;
