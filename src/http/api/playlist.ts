import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import { newPlaylistPayload } from "../types";

export const getUserPlaylists = async () => {
  const { data } = await instance.get(`${BASE_URL}/playlist`);

  return data;
};

export const newPlaylist = async (payload: newPlaylistPayload) => {
  const { data } = await instance.post(`${BASE_URL}/playlist/create`, payload);

  return data;
};
