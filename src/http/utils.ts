export const getToken = () => localStorage.getItem("token");

export const setToken = (token: any) => {
  localStorage.setItem("token", token);
};
