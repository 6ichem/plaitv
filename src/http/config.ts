import axios from "axios";
import { issueAccessToken } from "./api/auth";
import { getLocalAccessToken, isRefreshExpired, newAccessToken } from "./utils";
import store from "../store/store";
import { userLogout } from "../plaitv/Auth/Login/actions";

const access_token = localStorage.getItem("access_token") ?? "";

export const instance = axios.create({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (e) => {
    if (e?.response?.status == 403) {
      newAccessToken();
      location.reload();
    } else if (isRefreshExpired(e)) {
      store.dispatch(userLogout());
    } else {
      throw e;
    }
  }
);
