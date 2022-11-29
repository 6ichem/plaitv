import * as Types from "../actionTypes";

export const postLogin = (payload: any) => ({
  type: Types.POST_LOGIN,
  payload,
});

export const setLoginCreds = (payload: any) => ({
  type: Types.SET_LOGIN_CREDS,
  payload,
});

export const setLoginData = (payload: any) => ({
  type: Types.SET_LOGIN_DATA,
  payload,
});

export const postRefreshToken = (payload: any) => ({
  type: Types.POST_REFRESH_TOKEN,
  payload,
});

export const userLogout = () => ({
  type: Types.USER_LOGOUT,
});
