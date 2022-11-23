import { createUserPayload } from "../types";
import axios from "axios";
import { BASE_URL } from "../constants";

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
