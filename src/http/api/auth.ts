import {
  forgotPasswordPayload,
  getRefreshTokenPayload,
  issueAccessTokenPayload,
  loginUserPayload,
  resetPasswordPayload,
  resetTokenPayload,
  validateEmailPayload,
} from "../types";
import axios from "axios";
import { BASE_URL } from "../constants";
import { instance } from "../config";

export const loginUser = async (payload: loginUserPayload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};

export const forgotPassword = async (params: forgotPasswordPayload) => {
  const { data } = await axios.get(`${BASE_URL}/auth/forgot-password`, {
    params,
  });

  return data;
};

export const validateEmail = async (params: validateEmailPayload) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/validate-email-token`,
    null,
    {
      params,
    }
  );

  return data;
};

export const checkResetToken = async (params: resetTokenPayload) => {
  const { data } = await axios.get(`${BASE_URL}/auth/check-reset-token`, {
    params,
  });

  return data;
};

export const resetPassword = async (params: resetPasswordPayload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/reset-password`, null, {
    params,
  });

  return data;
};

export const getRefreshToken = async (params: getRefreshTokenPayload) => {
  const { data } = await instance.get(`${BASE_URL}/auth/get-refresh-token`, {
    params,
  });

  return data;
};

export const issueAccessToken = async (params: issueAccessTokenPayload) => {
  const { data } = await instance.post(
    `${BASE_URL}/auth/issue-new-access-token`,
    null,
    { params }
  );

  return data;
};
