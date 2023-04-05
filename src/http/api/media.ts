import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import {
  addMediaPayload,
  getPlaylistMediaPayload,
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

  const { data } = await instance.delete(
    `${BASE_URL}/media/delete/${media_id}`
  );

  return data;
};

export const httpFindMedia = async (payload: any) => {
  try {
    const { data } = await instance.post(
      `${BASE_URL}/media/get-video/`,
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

export const httpUploadVideo = async (payload: any) => {
  const { file, playlist_id, title, description, is_nsfw } = payload;
  try {
    const blob = new Blob([file], { type: file.type });

    const { data } = await instance.post(
      `${BASE_URL}/media/upload-video`,
      blob,
      {
        headers: {
          "content-type": file.type,
        },
        params: {
          playlist_id,
          title,
          description,
          is_nsfw,
        },
        // onUploadProgress: (progressEvent) => {
        //   const percentCompleted = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total!
        //   );
        //   console.log(percentCompleted);
        // },
      }
    );

    return data;
  } catch (e: any) {
    throw e;
  }
};
