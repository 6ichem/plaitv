import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const initialModalState = {
  newPlaylistModal: false,
  addVideoModal: false,
};

const modalStrategies = {
  [Types.SET_NEW_PLAYTLIST_MODAL]: (state: any, payload: any) => {
    return {
      ...state,
      newPlaylistModal: payload,
    };
  },
  [Types.SET_ADD_VIDEO_MODAL]: (state: any, payload: any) => {
    return {
      ...state,
      addVideoModal: payload,
    };
  },
  __default__: (state: any) => state,
};

export const modalState = createReducer(modalStrategies, {
  ...initialModalState,
});

const initialPlaylistState = {
  userPlaylists: null,
  playlistMedia: null,
  currentPlaylist: null,
  newPlaylist: null,
};

const userPlaylistsStrategies = {
  [Types.SET_USER_PLAYLIST]: (state: any, payload: any) => {
    return {
      ...state,
      userPlaylists: payload,
    };
  },
  [Types.SET_PLAYLIST_MEDIA]: (state: any, payload: any) => {
    return {
      ...state,
      playlistMedia: payload,
    };
  },
  [Types.SET_CURRENT_PLAYLIST]: (state: any, payload: any) => {
    return {
      ...state,
      currentPlaylist: payload,
    };
  },
  [Types.SET_NEW_PLAYLIST]: (state: any, payload: any) => {
    return {
      ...state,
      newPlaylist: payload,
    };
  },
  [Types.CLEAN_NEW_PLAYLIST]: (state: any) => {
    return {
      ...state,
      newPlaylist: null,
    };
  },
  __default__: (state: any) => state,
};

export const userPlaylistsState = createReducer(userPlaylistsStrategies, {
  ...initialPlaylistState,
});

const initialMediaState = {
  lambdaMedia: null,
};

const mediaStrategies = {
  [Types.SET_LAMBDA_MEDIA]: (state: any, payload: any) => {
    return {
      ...state,
      lambdaMedia: payload,
    };
  },

  __default__: (state: any) => state,
};

export const mediaState = createReducer(mediaStrategies, {
  ...initialMediaState,
});
