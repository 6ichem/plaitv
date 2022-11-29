import { issueAccessToken } from "./api/auth";

export const getLocalAccessToken = () =>
  localStorage.getItem("access_token") ?? "";

export const setLocalUser = (data: any) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const setLocalAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getLocalRefreshToken = () =>
  localStorage.getItem("refresh_token") ?? "";

export const setLocalRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const isRefreshExpired = (e: any) =>
  e?.response?.status == 403 && e?.response?.data?.detail == "Invalid token";

export const getLocalAccessTokenExpiry = () =>
  localStorage.getItem("access_token_expiry") ?? "";

export const setLocalAccessTokenExpiry = (expire: string) =>
  localStorage.setItem("access_token_expiry", expire);

export const newAccessToken = async () => {
  const refresh_token = getLocalRefreshToken();

  const { access_token } = await issueAccessToken({ refresh_token });

  setLocalAccessToken(access_token);
};
