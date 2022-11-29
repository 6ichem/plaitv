export const getLocalAccessToken = () =>
  localStorage.getItem("access_token") ?? "";

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
