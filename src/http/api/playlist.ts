import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import { editPlaylistPayload, newPlaylistPayload } from "../types";

export const getUserPlaylists = async () => {
  const { data } = await instance.get(`${BASE_URL}/playlist`);

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
