import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import {
  addMediaPayload,
  getPlaylistMediaPayload,
  lambdaMediaPayload,
  mediaControllerPayload,
} from "../types";

export const httpGetUserPlaylistMedia = async (
  params: getPlaylistMediaPayload
) => {
  const { data } = await instance.get(`${BASE_URL}/media/get-playlist-media`, {
    params,
  });

  return data;
};

export const httpDeleteMedia = async (payload: mediaControllerPayload) => {
  const { media_id } = payload;

  const { data } = await instance.delete(`${BASE_URL}/media/${media_id}`);

  return data;
};

export const getLambdaMedia = async (payload: lambdaMediaPayload) => {
  try {
    const { data } = await instance.post(
      `${BASE_URL}/media/get_lambda_media/`,
      payload
    );

    return data;
  } catch (e: any) {
    return e.response;
  }
};

export const httpAddMedia = async (payload: addMediaPayload) => {
  const { data } = await instance.post(`${BASE_URL}/media/create`, payload);

  return data;
};

export const httpGetPublicMedia = async (payload: any) => {
  const { username, playlist_id } = payload;
  const { data } = await instance.get(
    `${BASE_URL}/media/public/u/${username}/${playlist_id}/`
  );

  return data;
};
