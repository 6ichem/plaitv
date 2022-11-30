import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const initialModalState = {
  newPlaylistModal: false,
  addVideoModal: false,
  profileModal: false,
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
  [Types.SET_PROFILE_MODAL]: (state: any, payload: any) => {
    return {
      ...state,
      profileModal: payload,
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
  lambdaResults: null,
  currentMedia: null,
};

const mediaStrategies = {
  [Types.SET_LAMBDA_MEDIA]: (state: any, payload: any) => {
    return {
      ...state,
      lambdaMedia: payload,
    };
  },
  [Types.SHOW_LAMBA_RESULTS]: (state: any, payload: any) => {
    return {
      ...state,
      lambdaMedia: payload,
    };
  },
  [Types.SET_CURRENT_MEDIA]: (state: any, payload: any) => {
    return {
      ...state,
      currentMedia: payload,
    };
  },
  __default__: (state: any) => state,
};

export const mediaState = createReducer(mediaStrategies, {
  ...initialMediaState,
});

const initialLoaderState = {
  lambdaLoader: false,
  forgotPassLoader: false,
  loginLoader: false,
  registerLoader: false,
  createPlaylistLoader: false,
  playlistLoader: false,
  addMediaLoader: false,
  deleteMediaLoader: false,
  userProfileLoader: false,
};

const loaderStrategies = {
  [Types.SET_LAMBDA_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      lambdaLoader: payload,
    };
  },
  [Types.SET_FORGOT_PASS_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      forgotPassLoader: payload,
    };
  },
  [Types.SET_LOGIN_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      loginLoader: payload,
    };
  },
  [Types.SET_REGISTER_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      registerLoader: payload,
    };
  },
  [Types.SET_CREATE_PLAYLIST_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      createPlaylistLoader: payload,
    };
  },
  [Types.SET_ADD_MEDIA_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      addMediaLoader: payload,
    };
  },
  [Types.SET_DELETE_MEDIA_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      deleteMediaLoader: payload,
    };
  },
  [Types.SET_USER_PROFILE_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      userProfileLoader: payload,
    };
  },
  __default__: (state: any) => state,
};

export const loaderState = createReducer(loaderStrategies, {
  ...initialLoaderState,
});
