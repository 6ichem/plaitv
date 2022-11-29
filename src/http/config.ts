import axios from "axios";
import { getRefreshToken, issueAccessToken } from "./api/auth";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  isRefreshExpired,
  setLocalAccessToken,
} from "./utils";
import store from "../store/store";
import { userLogout } from "../plaitv/Auth/Login/actions";

const access_token = getLocalAccessToken();
const refresh_token = getLocalRefreshToken();

export const instance = axios.create({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (e) => {
    if (e?.response?.status == 403) {
      const data = await issueAccessToken({ refresh_token });
      const { access_token } = data;

      // setLocalAccessToken(access_token);

      console.log(e.config);

      instance.request(e.config);
    } else if (isRefreshExpired(e)) {
      store.dispatch(userLogout());
    }
  }
);
