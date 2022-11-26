import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const initialState = {
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
  ...initialState,
});
