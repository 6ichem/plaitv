import { AUTH } from "./constants";

export const SET_REGISTER_CREDS = `${AUTH}/SET_REGISTER_CREDS`;
export const SET_REGISTER_DATA = `${AUTH}/SET_REGISTER_DATA`;

export const SET_LOGIN_CREDS = `${AUTH}/SET_LOGIN_CREDS`;
export const SET_LOGIN_DATA = `${AUTH}/SET_LOGIN_DATA`;

export const SET_FORGOT_CREDS = `${AUTH}/SET_FORGOT_CREDS`;
export const SET_FORGOT_DATA = `${AUTH}/SET_FORGOT_DATA`;

export const SET_VALIDATE_DATA = `${AUTH}/SET_VALIDATE_DATA`;
export const SET_RESET_DATA = `${AUTH}/SET_VALIDATE_DATA`;
export const SET_CHECK_TOKEN_DATA = `${AUTH}/SET_CHECK_TOKEN_DATA`;

export const POST_REGISTER = `${AUTH}/POST_REGISTER`;
export const POST_LOGIN = `${AUTH}/POST_LOGIN`;
export const POST_FORGOT = `${AUTH}/POST_FORGOT`;
export const POST_VALIDATE = `${AUTH}/POST_VALIDATE`;
export const POST_RESET = `${AUTH}/POST_RESET`;
export const POST_CHECK_RESET = `${AUTH}/POST_CHECK_RESET`;
export const POST_RESEND_MAIL = `${AUTH}/POST_RESEND_MAIL`;
export const POST_REFRESH_TOKEN = `${AUTH}/POST_REFRESH_TOKEN`;

export const USER_LOGOUT = `${AUTH}/USER_LOGOUT`;
export const GET_USER = `${AUTH}/GET_USER`;
export const SET_USER = `${AUTH}/SET_USER`;
