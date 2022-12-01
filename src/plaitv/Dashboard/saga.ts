import toast from "react-hot-toast";
import { takeLatest, all, call, put, select, delay } from "redux-saga/effects";
import { httpChangePassword } from "../../http/api/auth";
import {
  getLambdaMedia,
  httpAddMedia,
  httpDeleteMedia,
  httpGetUserPlaylistMedia,
} from "../../http/api/media";
import {
  getUserPlaylists,
  httpUpdatePlaylist,
  newPlaylist,
} from "../../http/api/playlist";
import { httpUpdateUserProfile } from "../../http/api/users";
import { ResponseGenerator } from "../../http/types";
import { getLocalUser, setLocalUser } from "../../http/utils";
import {
  setNewPlaylist,
  setPlaylistMedia,
  setUserPlaylists,
  setCurrentPlaylist,
  setNewPlaylistModal,
  setLambdaMedia,
  getPlaylistMedia,
} from "./actions";
import * as Types from "./actionTypes";

export const state = (state: any) => state;

function* getUserPlaylistMedia({ payload }: any) {
  yield put(setPlaylistMedia(null));

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

function* getAllUserPlaylists(): any {
  try {
    const resp: any = yield call(getUserPlaylists);

    yield put(setUserPlaylists(resp));

    if (resp.length > 0) {
      yield put(setCurrentPlaylist(resp[0]));

      yield put(getPlaylistMedia({ playlist_id: resp[0].playlist_id }));
    }
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

    const resp: ResponseGenerator = yield call(getLambdaMedia, payload);
    const { request_id }: any = resp;

    let isResolved = false;
    const friendlyMessage = "We're getting your video.";

    toast.loading(friendlyMessage, {
      style: { background: "#333", color: "#fff" },
    });

    do {
      const resp: any = yield call(getLambdaMedia, {
        request_id,
      });

      const { status, details } = resp;

      if (details !== friendlyMessage) {
        toast.dismiss();
        toast.loading(details, {
          style: { background: "#333", color: "#fff" },
        });
      }

      if (status === "failed") {
        isResolved = true;

        yield put(setLambdaMedia(resp));
        yield put({ type: Types.SET_LAMBDA_LOADER, payload: false });
        toast.dismiss();
        toast.error(details, {
          style: { background: "#333", color: "#fff" },
        });
      } else if (status === "Success") {
        isResolved = true;

        yield put(setLambdaMedia(resp));
        yield put({ type: Types.SET_LAMBDA_LOADER, payload: false });

        toast.dismiss();
        toast.success(details, {
          style: { background: "#333", color: "#fff" },
        });
      }

      yield delay(5000);
    } while (isResolved == false);
  } catch (e: any) {
    yield put(setLambdaMedia(e?.response?.data));
  }
}

function* deleteMedia({ payload }: any) {
  try {
    yield put({ type: Types.SET_DELETE_MEDIA_LOADER, payload: true });

    const {
      userPlaylists: { playlistMedia },
    } = yield select(state);

    const resp: ResponseGenerator = yield call(httpDeleteMedia, payload);

    const updatedData = playlistMedia.filter(
      (i: any) => i.media_id !== payload.media_id
    );

    yield put(setPlaylistMedia(updatedData));

    yield put({ type: Types.SET_DELETE_MEDIA_LOADER, payload: false });

    toast.success(`Deleted ${payload.title} to playlist`, {
      style: { background: "#333", color: "#fff" },
    });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* addMediaToPlaylist({ payload }: any): any {
  try {
    yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: true });

    const {
      userPlaylists: { playlistMedia },
    } = yield select(state);

    const resp: any = yield call(httpAddMedia, payload);

    const cloneMedia = [...playlistMedia];
    cloneMedia.push(resp);

    yield put(setPlaylistMedia(cloneMedia));

    toast.success(`Added ${resp.title} to playlist`, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: false });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: false });

    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* updateUserProfile({ payload }: any): any {
  try {
    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: true });

    const resp: any = yield call(httpUpdateUserProfile, payload);
    const currentUser = JSON.parse(getLocalUser());
    setLocalUser({ ...currentUser, payload });

    toast.success(`Updated profile`, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });
    yield put({ type: Types.SET_PROFILE_MODAL, payload: false });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });

    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* changeUserPassword({ payload }: any): any {
  try {
    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: true });

    const resp: any = yield call(httpChangePassword, payload);

    toast.success(`Updated password`, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });
    yield put({ type: Types.SET_PROFILE_MODAL, payload: false });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });

    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* watcher() {
  yield all([takeLatest(Types.GET_USER_PLAYLISTS, getAllUserPlaylists)]);
  yield all([takeLatest(Types.GET_PLAYLIST_MEDIA, getUserPlaylistMedia)]);
  yield all([takeLatest(Types.POST_NEW_PLAYLIST, createNewPlaylist)]);
  yield all([takeLatest(Types.POST_UPDATE_PLAYLIST, updatePlaylist)]);
  yield all([takeLatest(Types.POST_LAMBDA_MEDIA, findMedia)]);
  yield all([takeLatest(Types.POST_DELETE_MEDIA, deleteMedia)]);
  yield all([takeLatest(Types.POST_ADD_MEDIA, addMediaToPlaylist)]);
  yield all([takeLatest(Types.POST_UPDATE_USER_PROFILE, updateUserProfile)]);
  yield all([takeLatest(Types.POST_CHANGE_PASSWORD, changeUserPassword)]);
}

export const dashboardSaga = watcher;
