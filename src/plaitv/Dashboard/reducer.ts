import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const initialState = {
  newPlaylistModal: false,
  addVideoModal: false,
  userPlaylists: null,
  playlistMedia: null,
  currentPlaylist: null,
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
  ...initialState,
});

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
  __default__: (state: any) => state,
};

export const userPlaylistsState = createReducer(userPlaylistsStrategies, {
  ...initialState,
});

// const userStrategies = {
//   [Types.RESET_APP_STATE]: () => {
//     return {
//       ...initialState,
//     };
//   },

//   __default__: (state: any) => state,
// };

// export const userState = createReducer(userStrategies, {
//   ...initialState,
// });
