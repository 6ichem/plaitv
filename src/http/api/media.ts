import axios from "axios";
import { instance } from "../config";
import { BASE_URL } from "../constants";
import { getPlaylistMediaPayload } from "../types";

export const httpGetUserPlaylistMedia = async (
  params: getPlaylistMediaPayload
) => {
  const { data } = await instance.get(`${BASE_URL}/media`, {
    params,
  });

  return data;
};
