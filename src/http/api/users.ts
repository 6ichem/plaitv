import { createUserPayload, userProfilePayload } from "../types";
import axios from "axios";
import { BASE_URL } from "../constants";
import { instance } from "../config";

export const createUser = async (payload: createUserPayload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/create-user`, payload);

    return data;
  } catch (e: any) {
    throw e;
  }
};

export const resendVerificationMail = async (payload: createUserPayload) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/users/resend-email-verification_link`,
      payload
    );

    return data;
  } catch (e: any) {
    throw e;
  }
};

export const httpUpdateUserProfile = async (payload: userProfilePayload) => {
  try {
    const { data } = await instance.put(
      `${BASE_URL}/users/update-user`,
      payload
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const httpGetTerms = async () => {
  try {
    const { data } = await instance.get(`${BASE_URL}/users/get-terms`);

    return data;
  } catch (e: any) {
    throw e;
  }
};

export const httpSearchUser = async (username: string) => {
  try {
    const { data } = await instance.get(`${BASE_URL}/users/search-username`, {
      params: { username },
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const httpFindProfile = async (username: string) => {
  try {
    const { data } = await instance.get(
      `${BASE_URL}/users/get-public-profile/u/${username}/`
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};

export const httpDeleteAccount = async (password: string) => {
  try {
    const { data } = await instance.delete(`${BASE_URL}/users/delete-account`, {
      params: {
        password,
      },
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};
