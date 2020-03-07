import axios from "axios";

const appID = "2acmcPV36o2Y7HpZCX93FuHo";
const appSecret = "a4R9QmDp3PHM2PnPqRzG82k6";

const instance = axios.create({
  baseURL: "https://gp-server.hunger-valley.com/",
  headers: {
    "t-app-id": appID,
    "t-app-secret": appSecret,
  },
});

// 拦截器
instance.interceptors.request.use(
  function(config) {
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = `Bearer ${xToken}`;
    }
    return config;
  },
  function(error) {
    console.error(error);
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 获得 data 的时候
    if (response.headers["x-token"]) {
      localStorage.setItem("x-token", response.headers["x-token"]);
    }
    return response;
  },
  function(error) {
    // 抛出 error 的时候
    return Promise.reject(error);
  },
);

export default instance;
