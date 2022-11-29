import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { httpGetUserPlaylistMedia } from "../../http/api/media";
import { getUserPlaylists, newPlaylist } from "../../http/api/playlist";
import { ResponseGenerator } from "../../http/types";
import { setNewPlaylist, setPlaylistMedia, setUserPlaylists } from "./actions";
import * as Types from "./actionTypes";

export const state = (state: any) => state;

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

function* getAllUserPlaylists() {
  try {
    const {
      userPlaylists: { currentPlaylist },
    } = yield select(state);

    const resp: ResponseGenerator = yield call(getUserPlaylists);

    yield put(setUserPlaylists(resp));

    yield call(getUserPlaylistMedia, {
      playlist_id: currentPlaylist?.playlist_id,
    });
  } catch (e: any) {
    yield put(setUserPlaylists(e?.response?.data));
  }
}

function* createNewPlaylist({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(newPlaylist, payload);

    yield put(setNewPlaylist(resp));
  } catch (e: any) {
    yield put(setNewPlaylist(e?.response?.data));
  }
}

function* watcher() {
  yield all([takeLatest(Types.GET_USER_PLAYLISTS, getAllUserPlaylists)]);
  yield all([takeLatest(Types.GET_PLAYLIST_MEDIA, getUserPlaylistMedia)]);
  yield all([takeLatest(Types.POST_NEW_PLAYLIST, createNewPlaylist)]);
}

export const dashboardSaga = watcher;
