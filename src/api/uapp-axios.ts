import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useUserStore } from "../store/user"

import { addQueryParamsToPath } from "@/util/QueryParam";
import LocaleUtil from "@/util/LocaleUtil";

const defaultBaseURL = 'https://d-1314735556.cos.ap-shanghai.myqcloud.com/up/'
// const defaultBaseURL = './data/universal-app/main-menu.json'

const api: AxiosInstance = axios.create({
  baseURL: defaultBaseURL,
  timeout: 6000,
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      // 如果有 token，则将其添加到请求头中
      config.headers!.Authorization = `Bearer ${token}`;
    }

    // console.log("Sending Request:", config);
    if(config.url) {
      const locale = LocaleUtil.getCurrentLocale()
      config.url = addQueryParamsToPath(config.url, { locale })
    }

    return config;
  },
  (error) => {
    // 处理请求错误
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && typeof response.data === "string") {
      response.data = JSON.parse(response.data);
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn("Unauthorized access. Redirecting to login...");
          break;
        case 403:
          console.warn("Forbidden access.");
          break;
        case 404:
          console.warn("Resource not found.");
          break;
        case 500:
          console.error("Server internal error.");
          break;
        default:
          console.error("Unexpected error occurred.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
