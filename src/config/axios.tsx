import axios from "axios";
import history from "./history";

const appID = "2acmcPV36o2Y7HpZCX93FuHo";
const appSecret = "a4R9QmDp3PHM2PnPqRzG82k6";

const instance = axios.create({
  // baseURL: "https://gp-server.hunger-valley.com/",
  baseURL: "http://localhost:3000",
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
