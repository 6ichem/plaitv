import { toast } from "react-hot-toast";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { httpGetPublicUserPlaylists } from "../../http/api/playlist";
import { httpFindProfile, httpSearchUser } from "../../http/api/users";
import { ResponseGenerator } from "../../http/types";
import {
  setFoundProfile,
  setFoundProfilePlaylists,
  setSearchResults,
} from "./actions";
import * as Types from "./actionTypes";
import { SET_PUBLIC_PROFILE_LOADER } from "../Dashboard/actionTypes";
import { setPlaylistMedia } from "../Dashboard/actions";
import { httpGetPublicMedia } from "../../http/api/media";

export const state = (state: any) => state;

function* searchUserSaga({ payload }: any): any {
  yield put({ type: Types.SET_SEARCH_LOADER, payload: true });
  yield put(setFoundProfile(null));
  yield put(setFoundProfilePlaylists(null));

  try {
    const resp: any = yield call(httpSearchUser, payload);

    yield put(setSearchResults(resp));

    yield put({ type: Types.SET_SEARCH_LOADER, payload: false });
  } catch (e: any) {
    console.log("SearchUserErr", e);
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });
    yield put({ type: Types.SET_SEARCH_LOADER, payload: false });
  }
}

function* findProfile({ payload }: any): any {
  try {
    const resp: any = yield call(httpFindProfile, payload);

    yield put(setFoundProfile(resp));
  } catch (e: any) {
    console.log("findProfileErr", e);
  }
}

function* getPublicUserPlaylists({ payload }: any): any {
  const {
    explore: { foundProfile },
  } = yield select(state);

  try {
    if (foundProfile && foundProfile.username) {
      const resp: any = yield call(
        httpGetPublicUserPlaylists,
        foundProfile.username
      );

      yield put(setFoundProfilePlaylists(resp));
    } else if (payload.username) {
      const resp: any = yield call(httpGetPublicUserPlaylists, payload);

      yield put(setFoundProfilePlaylists(resp));
    }
  } catch (e: any) {
    console.log("getPublicUserPlaylists", e?.response?.data);
    yield put(setFoundProfilePlaylists(e?.response?.data));
  }
}

function* getUserPlaylistMedia({ payload }: any) {
  yield put(setPlaylistMedia(null));

  try {
    const resp: ResponseGenerator = yield call(httpGetPublicMedia, payload);

    yield put(setPlaylistMedia(resp));
  } catch (e: any) {
    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* watcher() {
  yield all([takeLatest(Types.SEARCH_USER, searchUserSaga)]);
  yield all([takeLatest(Types.FIND_PROFILE, findProfile)]);
  yield all([takeLatest(Types.FIND_USER_PLAYLISTS, getPublicUserPlaylists)]);
  yield all([
    takeLatest(Types.GET_PUBLIC_PLAYLIST_MEDIA, getUserPlaylistMedia),
  ]);
}

export const exploreSaga = watcher;
