import * as Types from "./actionTypes";

export const setNewPlaylistModal = (payload: any) => ({
  type: Types.SET_NEW_PLAYTLIST_MODAL,
  payload,
});

export const setAddVideoModal = (payload: any) => ({
  type: Types.SET_ADD_VIDEO_MODAL,
  payload,
});
