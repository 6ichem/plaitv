import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import { getPlaylistMediaPayload, lambdaMediaPayload } from "../types";

export const httpGetUserPlaylistMedia = async (
  params: getPlaylistMediaPayload
) => {
  const { data } = await instance.get(`${BASE_URL}/media`, {
    params,
  });

  return data;
};

export const getLambdaMedia = async (payload: lambdaMediaPayload) => {
  const { data } = await instance.post(`${BASE_URL}/get_lambda_media`, payload);

  return data;
};
