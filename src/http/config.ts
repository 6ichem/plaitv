import axios from "axios";
import { issueAccessToken } from "./api/auth";
import {
  getLocalAccessToken,
  isRefreshExpired,
  newAccessToken,
  setLocalAccessToken,
  setLocalRefreshToken,
} from "./utils";
import store from "../store/store";
import { userLogout } from "../plaitv/Auth/Login/actions";
import { getRefreshToken } from "./api/auth";

const access_token = localStorage.getItem("access_token") ?? "";

export const instance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

let isRefreshing = false;
let refreshSubscribers: any = [];

instance.interceptors.response.use(
  (response) => {
    if (response.headers.access_token)
      setLocalAccessToken(response.headers.access_token);

    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 403) {
      if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshToken();
        isRefreshing = false;
        onRefreshed(newToken);
        refreshSubscribers = [];
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token: any) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = await getRefreshToken({
      access_token: getLocalAccessToken(),
    });

    const { refresh_token } = refreshToken;
    setLocalRefreshToken(refresh_token);

    try {
      const accessToken = await issueAccessToken({
        refresh_token: refreshToken,
      });

      const { access_token } = accessToken;

      localStorage.setItem("access_token", access_token);

      return access_token;
    } catch (e) {
      console.log("REFRESH_TOKEN_ERROR", e);
      // location.reload();
      throw e;
    }
  } catch (e) {
    console.log("REFRESH_TOKEN_ROOT_ERROR", e);
    // store.dispatch(userLogout());
    throw e;
  }
};

function onRefreshed(newToken: any) {
  refreshSubscribers.forEach((subscriber: any) => subscriber(newToken));
}
