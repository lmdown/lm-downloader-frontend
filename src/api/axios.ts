import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "../store/user"

import { addQueryParamsToPath } from "@/util/QueryParam";
import LocaleUtil from "@/util/LocaleUtil";
// const defaultBaseURL = '/api'
const defaultBaseURL = 'http://localhost:19312/api'

// 创建 Axios 实例
const api: AxiosInstance = axios.create({
  //baseURL: '/', // API 端点
  baseURL: defaultBaseURL,
  timeout: 6000, // 设置请求超时时间
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      // 如果有 token，则将其添加到请求头中
      config.headers!.Authorization = `Bearer ${token}`;
    }

    // 打印请求信息（可选）
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

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && typeof response.data === "string") {
      response.data = JSON.parse(response.data);
    }
    // 打印响应信息
    //console.log("Received Response data:", response.data);

    // 返回响应数据
    return response;
  },
  (error) => {
    // 处理响应错误
    console.error("Response Error:", error);
    // 根据错误状态码进行不同的处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权错误（例如：重定向到登录页面）
          console.warn("Unauthorized access. Redirecting to login...");
          // 可以在这里实现重定向逻辑
          break;
        case 403:
          // 处理禁止访问错误
          console.warn("Forbidden access.");
          break;
        case 404:
          // 处理资源未找到错误
          console.warn("Resource not found.");
          break;
        case 500:
          // 处理服务器内部错误
          console.error("Server internal error.");
          break;
        default:
          console.error("Unexpected error occurred.");
      }
    }

    // 返回错误对象，以便组件中可以捕获并处理
    return Promise.reject(error);
  }
);

export default api;
