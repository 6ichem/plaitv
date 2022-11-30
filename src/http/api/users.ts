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
  const { data } = await instance.put(
    `${BASE_URL}/users/update-user-profile`,
    payload
  );
  return data;
};
