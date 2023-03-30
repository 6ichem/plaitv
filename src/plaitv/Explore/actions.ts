import * as Types from "./actionTypes";

export const setSearchInput = (payload: any) => ({
  type: Types.SET_SEARCH_INPUT,
  payload,
});

export const searchUser = (payload: any) => ({
  type: Types.SEARCH_USER,
  payload,
});

export const setSearchResults = (payload: any) => ({
  type: Types.SET_SEARCH_RESULTS,
  payload,
});

export const findProfile = (payload: any) => ({
  type: Types.FIND_PROFILE,
  payload,
});

export const setFoundProfile = (payload: any) => ({
  type: Types.SET_FOUND_PROFILE,
  payload,
});

export const findUserPlaylists = () => ({
  type: Types.FIND_USER_PLAYLISTS,
});

export const setFoundProfilePlaylists = (payload: any) => ({
  type: Types.SET_FOUND_USER_PLAYLISTS,
  payload,
});
