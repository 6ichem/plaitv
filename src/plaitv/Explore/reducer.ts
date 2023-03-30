import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const initialState = {
  searchResults: null,
  searchInput: "",
  searchLoader: false,
  foundProfile: null,
  foundProfilePlaylists: null,
};

const exploreStrategies = {
  [Types.SET_SEARCH_INPUT]: (state: any, payload: any) => {
    return {
      ...state,
      searchInput: payload,
    };
  },
  [Types.SET_SEARCH_RESULTS]: (state: any, payload: any) => {
    return {
      ...state,
      searchResults: payload,
    };
  },
  [Types.SET_SEARCH_LOADER]: (state: any, payload: any) => {
    return {
      ...state,
      searchLoader: payload,
    };
  },
  [Types.SET_FOUND_PROFILE]: (state: any, payload: any) => {
    return {
      ...state,
      foundProfile: payload,
    };
  },
  [Types.SET_FOUND_USER_PLAYLISTS]: (state: any, payload: any) => {
    return {
      ...state,
      foundProfilePlaylists: payload,
    };
  },
  __default__: (state: any) => state,
};

export const exploreState = createReducer(exploreStrategies, {
  ...initialState,
});
