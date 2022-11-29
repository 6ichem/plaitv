import { takeLatest, all, call, put } from "redux-saga/effects";
import { httpGetUserPlaylistMedia } from "../../http/api/media";
import { getUserPlaylists } from "../../http/api/playlist";
import { ResponseGenerator } from "../../http/types";
import { setPlaylistMedia, setUserPlaylists } from "./actions";
import * as Types from "./actionTypes";

function* getAllUserPlaylists({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(getUserPlaylists);

    yield put(setUserPlaylists(resp));
  } catch (e: any) {
    yield put(setUserPlaylists(e?.response?.data));
  }
}

function* getUserPlaylistMedia({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(
      httpGetUserPlaylistMedia,
      payload
    );

    yield put(setPlaylistMedia(resp));
  } catch (e: any) {
    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* watcher() {
  yield all([takeLatest(Types.GET_USER_PLAYLISTS, getAllUserPlaylists)]);
  yield all([takeLatest(Types.GET_PLAYLIST_MEDIA, getUserPlaylistMedia)]);
}

export const dashboardSaga = watcher;
