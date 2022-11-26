export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token: any) => {
  localStorage.setItem("access_token", token);
};
