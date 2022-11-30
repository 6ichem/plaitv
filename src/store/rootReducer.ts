import { combineReducers } from "redux";
import { AUTH } from "../plaitv/Auth/constants";
import { authReducer } from "../plaitv/Auth/reducer";
import {
  mediaState,
  modalState,
  userPlaylistsState,
  // userState,
} from "../plaitv/Dashboard/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalState,
  userPlaylists: userPlaylistsState,
  media: mediaState,
});

export default (state: any, action: any) => {
  if (action.type === `${AUTH}/USER_LOGOUT`) {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token_expiry");
    window.location.href = "/";

    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
