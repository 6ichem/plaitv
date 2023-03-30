import { createUserPayload, userProfilePayload } from "../types";
import axios from "axios";
import { BASE_URL } from "../constants";
import { instance } from "../config";

export const createUser = async (payload: createUserPayload) => {
  const { data } = await axios.post(`${BASE_URL}/users/create`, payload);

  return data;
};

export const resendVerificationMail = async (payload: createUserPayload) => {
  const { data } = await axios.post(
    `${BASE_URL}/users/resend-email-verification_link`,
    payload
  );

  return data;
};

export const httpUpdateUserProfile = async (payload: userProfilePayload) => {
  const { data } = await instance.put(`${BASE_URL}/users/update-user`, payload);
  return data;
};

export const httpGetTerms = async () => {
  const { data } = await instance.get(`${BASE_URL}/users/get-terms`);

  return data;
};

export const httpSearchUser = async (username: string) => {
  const { data } = await instance.get(`${BASE_URL}/users/search-username`, {
    params: { username },
  });
  return data;
};

export const httpFindProfile = async (username: string) => {
  const { data } = await instance.get(
    `${BASE_URL}/users/get-public-profile/u/${username}/`
  );
  return data;
};
