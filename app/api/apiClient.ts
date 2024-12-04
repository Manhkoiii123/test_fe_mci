import qs from "qs";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";

const baseURLApp = process.env.NEXT_PUBLIC_API;

const apiClient = axios.create({
  baseURL: baseURLApp,
  headers: {
    "content-type": "application/json",
  },

  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

const cookies = new Cookies();

apiClient.interceptors.request.use(
  async (config) => {
    const noAuthRequiredRoutes = ["/user-login/", "/create-user-account/"];
    const isNoAuthRoute = noAuthRequiredRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (!isNoAuthRoute) {
      const accessToken = cookies.get("access_token");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = "Bearer " + accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    console.log("🚀 ~ error:", error);
    // const originalConfig = error.config;
    // if (location.pathname !== routerConstants.login && error.response) {
    //   // Access Token was expired
    //   if (error.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const rs = await axios.post(
    //         `${process.env.NEXT_PUBLIC_API}user/get-access-token-with-refresh`,
    //         {
    //           refresh_token: cookies.get("refresh_token"),
    //         }
    //       );
    //       originalConfig.headers["Authorization"] =
    //         "Bearer " + rs?.data?.data?.accessToken;
    //       return await apiClient(originalConfig);
    //     } catch (_error) {
    //       window.location.href = routerConstants.login;
    //       return Promise.reject(_error);
    //     }
    //   }
    // }
    // return Promise.reject(error);
  }
);
export default apiClient;
