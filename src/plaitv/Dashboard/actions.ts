import * as Types from "./actionTypes";

export const setNewPlaylistModal = (payload: any) => ({
  type: Types.SET_NEW_PLAYTLIST_MODAL,
  payload,
});

export const setAddVideoModal = (payload: any) => ({
  type: Types.SET_ADD_VIDEO_MODAL,
  payload,
});

export const getUserPlaylists = () => ({
  type: Types.GET_USER_PLAYLISTS,
});

export const setUserPlaylists = (payload: any) => ({
  type: Types.SET_USER_PLAYLIST,
  payload,
});

export const getPlaylistMedia = (payload: any) => ({
  type: Types.GET_PLAYLIST_MEDIA,
  payload,
});

export const setPlaylistMedia = (payload: any) => ({
  type: Types.SET_PLAYLIST_MEDIA,
  payload,
});

export const setCurrentPlaylist = (payload: any) => ({
  type: Types.SET_CURRENT_PLAYLIST,
  payload,
});

export const setNewPlaylist = (payload: any) => ({
  type: Types.SET_NEW_PLAYLIST,
  payload,
});

export const postNewPlaylist = (payload: any) => ({
  type: Types.POST_NEW_PLAYLIST,
  payload,
});

export const cleanNewPlaylist = () => ({
  type: Types.CLEAN_NEW_PLAYLIST,
});

export const postUpdatePlaylist = (payload: any) => ({
  type: Types.POST_UPDATE_PLAYLIST,
  payload,
});

export const setLambdaMedia = (payload: any) => ({
  type: Types.SET_LAMBDA_MEDIA,
  payload,
});

export const postLambdaMedia = (payload: any) => ({
  type: Types.POST_LAMBDA_MEDIA,
  payload,
});

export const postDeleteMedia = (payload: any) => ({
  type: Types.POST_DELETE_MEDIA,
  payload,
});

export const showLambdaResults = (payload: any) => ({
  type: Types.SHOW_LAMBA_RESULTS,
  payload,
});
