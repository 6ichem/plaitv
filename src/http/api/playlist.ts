import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import { editPlaylistPayload, newPlaylistPayload } from "../types";

export const getUserPlaylists = async () => {
  const { data } = await instance.get(
    `${BASE_URL}/playlist/get-user-playlists`
  );

  return data;
};

export const newPlaylist = async (payload: newPlaylistPayload) => {
  const { data } = await instance.post(`${BASE_URL}/playlist/create`, payload);

  return data;
};

export const httpUpdatePlaylist = async (payload: editPlaylistPayload) => {
  const { playlist_id, title, description } = payload;
  const { data } = await instance.put(`${BASE_URL}/playlist/${playlist_id}`, {
    title,
    description,
  });

  return data;
};

export const httpDeletePlaylist = async (payload: any) => {
  const { playlist_id } = payload;
  const { data } = await instance.delete(
    `${BASE_URL}/playlist/${playlist_id}`,
    { params: { playlist_id } }
  );

  return data;
};

export const httpGetPublicUserPlaylists = async (username: string) => {
  const { data } = await instance.get(
    `${BASE_URL}/playlist/get-user-playlists/public/u/${username}/`
  );

  return data;
};
