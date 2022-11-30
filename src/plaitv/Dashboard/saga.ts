import toast from "react-hot-toast";
import { takeLatest, all, call, put, select, delay } from "redux-saga/effects";
import {
  getLambdaMedia,
  httpDeleteMedia,
  httpGetUserPlaylistMedia,
} from "../../http/api/media";
import {
  getUserPlaylists,
  httpUpdatePlaylist,
  newPlaylist,
} from "../../http/api/playlist";
import { ResponseGenerator } from "../../http/types";
import {
  setNewPlaylist,
  setPlaylistMedia,
  setUserPlaylists,
  setCurrentPlaylist,
  setNewPlaylistModal,
  setLambdaMedia,
} from "./actions";
import * as Types from "./actionTypes";

export const state = (state: any) => state;

function* getUserPlaylistMedia({ payload }: any) {
  try {
    yield put(setPlaylistMedia(null));

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
    yield put({ type: Types.SET_CREATE_PLAYLIST_LOADER, payload: true });

    const {
      userPlaylists: { userPlaylists },
    } = yield select(state);

    const resp: ResponseGenerator = yield call(newPlaylist, payload);

    yield put(setNewPlaylist(resp));

    if ("playlist_id" in resp) {
      yield put(setUserPlaylists([...userPlaylists, resp]));

      toast.success("Playlist created", {
        style: { background: "#333", color: "#fff" },
      });

      yield put({ type: Types.SET_CREATE_PLAYLIST_LOADER, payload: false });
      yield put({ type: Types.SET_NEW_PLAYTLIST_MODAL, payload: false });
    }
  } catch (e: any) {
    yield put({ type: Types.SET_CREATE_PLAYLIST_LOADER, payload: false });
    yield put(setNewPlaylist(e?.response?.data));
  }
}

function* updatePlaylist({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(httpUpdatePlaylist, payload);

    yield put(setCurrentPlaylist({ ...resp }));

    toast.success("Playlist updated.", {
      style: { background: "#333", color: "#fff" },
    });
  } catch (e: any) {
    yield put(setCurrentPlaylist(e?.response?.data));
  }
}

function* findMedia({ payload }: any): any {
  yield put({ type: Types.SET_LAMBDA_MEDIA, payload: null });

  try {
    yield put({ type: Types.SET_LAMBDA_LOADER, payload: true });

    toast.loading("Fetching data...", {
      style: { background: "#333", color: "#fff" },
    });

    const resp: ResponseGenerator = yield call(getLambdaMedia, payload);
    const { request_id }: any = resp;

    let isResolved = false;

    do {
      const resp: any = yield call(getLambdaMedia, {
        request_id,
      });

      const { status } = resp;

      if (status === "failed") {
        isResolved = true;

        yield put(setLambdaMedia(resp));
        yield put({ type: Types.SET_LAMBDA_LOADER, payload: false });
        toast.dismiss();
        toast.error("Failed to fetch data", {
          style: { background: "#333", color: "#fff" },
        });
      } else if (status === "Success") {
        isResolved = true;

        yield put(setLambdaMedia(resp));
        yield put({ type: Types.SET_LAMBDA_LOADER, payload: false });

        toast.dismiss();
        toast.success("Fetched data!", {
          style: { background: "#333", color: "#fff" },
        });
      }

      yield delay(10000);
    } while (isResolved == false);
  } catch (e: any) {
    yield put(setLambdaMedia(e?.response?.data));
  }
}

function* deleteMedia({ payload }: any) {
  try {
    const {
      userPlaylists: { playlistMedia },
    } = yield select(state);

    const resp: ResponseGenerator = yield call(httpDeleteMedia, payload);

    const updatedData = playlistMedia.filter(
      (i: any) => i.playlist_id !== payload.playlist_id
    );
    yield put(setPlaylistMedia(updatedData));
  } catch (e: any) {
    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* watcher() {
  yield all([takeLatest(Types.GET_USER_PLAYLISTS, getAllUserPlaylists)]);
  yield all([takeLatest(Types.GET_PLAYLIST_MEDIA, getUserPlaylistMedia)]);
  yield all([takeLatest(Types.POST_NEW_PLAYLIST, createNewPlaylist)]);
  yield all([takeLatest(Types.POST_UPDATE_PLAYLIST, updatePlaylist)]);
  yield all([takeLatest(Types.POST_LAMBDA_MEDIA, findMedia)]);
}

export const dashboardSaga = watcher;
