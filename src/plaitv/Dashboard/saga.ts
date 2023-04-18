import toast from "react-hot-toast";
import { takeLatest, all, call, put, select, delay } from "redux-saga/effects";
import { httpChangePassword, httpCheckToken } from "../../http/api/auth";
import {
  httpAddMedia,
  httpDeleteMedia,
  httpFindMedia,
  httpGetMediaStatus,
  httpGetUserPlaylistMedia,
  httpUploadVideo,
} from "../../http/api/media";
import {
  getUserPlaylists,
  httpDeletePlaylist,
  httpUpdatePlaylist,
  newPlaylist,
} from "../../http/api/playlist";
import {
  httpDeleteAccount,
  httpGetTerms,
  httpUpdateUserProfile,
} from "../../http/api/users";
import { ResponseGenerator } from "../../http/types";
import { getLocalUser, setLocalUser } from "../../http/utils";
import {
  setNewPlaylist,
  setPlaylistMedia,
  setUserPlaylists,
  setCurrentPlaylist,
  setNewPlaylistModal,
  getPlaylistMedia,
  setCurrentMedia,
  setMediaStatus,
} from "./actions";
import * as Types from "./actionTypes";
import { userLogout } from "../Auth/Login/actions";

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
    const user = getLocalUser();
    const userData = JSON.parse(user);

    const whichPlaylist =
      userData.last_playlist_id || userData.default_playlist_id;
    const findPlaylist = resp.find((i: any) => i.playlist_id == whichPlaylist);
    const playlist = findPlaylist || resp[0];

    yield put(setUserPlaylists(resp));

    if (resp.length > 0) {
      yield put(setCurrentPlaylist(playlist));

      yield put(getPlaylistMedia({ playlist_id: playlist.playlist_id }));
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
  try {
    const resp: ResponseGenerator = yield call(httpFindMedia, payload);

    toast.success("Video queued for upload", {
      style: { background: "#333", color: "#fff" },
    });

    yield delay(1500);
    yield put({ type: Types.SET_ADD_VIDEO_MODAL, payload: false });
  } catch (e: any) {
    console.log(e);

    toast.dismiss();
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });
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

    yield put({ type: Types.SET_ADD_VIDEO_MODAL, payload: false });
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

    if (playlistMedia.length == 0) yield put(setCurrentMedia(cloneMedia[0]));

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

    setLocalUser({ ...currentUser, ...resp });

    if (payload.terms_accepted) {
      toast.success(`Thank you, you will be redirected shortly...`, {
        style: { background: "#333", color: "#fff" },
      });
    } else {
      toast.success(`Updated profile`, {
        style: { background: "#333", color: "#fff" },
      });
    }

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });
    yield put({ type: Types.SET_PROFILE_MODAL, payload: false });
  } catch (e: any) {
    toast.error(`${e?.response?.data?.detail}`, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });
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
    yield put({ type: Types.SET_CHANGE_PWD_MODAL, payload: false });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });

    yield put(setPlaylistMedia(e?.response?.data));
  }
}

function* deletePlaylist({ payload }: any) {
  try {
    yield put({ type: Types.SET_DELETE_PLAYLIST_LOADER, payload: true });

    const {
      userPlaylists: { userPlaylists },
    } = yield select(state);

    const resp: ResponseGenerator = yield call(httpDeletePlaylist, payload);

    const updatedData = userPlaylists.filter(
      (i: any) => i.playlist_id !== payload.playlist_id
    );

    yield put(setUserPlaylists(updatedData));
    yield put(setCurrentPlaylist(updatedData[0]));
    yield put(getPlaylistMedia({ playlist_id: updatedData[0]?.playlist_id }));

    yield put({ type: Types.SET_DELETE_PLAYLIST_LOADER, payload: false });

    toast.success(`Deleted ${payload.title}`, {
      style: { background: "#333", color: "#fff" },
    });

    yield put({ type: Types.SET_DELETE_PLAYLIST_MODAL, payload: false });
  } catch (e: any) {
    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });

    yield put(setUserPlaylists(e?.response?.data));
  }
}

function* uploadVideo({ payload }: any) {
  yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: true });

  try {
    const resp: ResponseGenerator = yield call(httpUploadVideo, payload);

    toast.success("Video queued for upload", {
      style: { background: "#333", color: "#fff" },
    });

    yield delay(1500);
    yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: false });
    yield put({ type: Types.SET_ADD_VIDEO_MODAL, payload: false });
  } catch (e: any) {
    console.log(e);
    toast.error(e?.response?.data?.detail, {
      style: { background: "#333", color: "#fff" },
    });
    console.log("UPLOAD_VIDEO", e?.response?.data);
    yield put({ type: Types.SET_ADD_MEDIA_LOADER, payload: false });

    // yield put(setUserPlaylists(e?.response?.data));
  }
}

function* mediaStatus({ payload }: any) {
  const {
    userPlaylists: { currentPlaylist },
  } = yield select(state);

  yield put({ type: Types.SET_REFRESH_STATUS_LOADER, payload: true });

  try {
    const resp: ResponseGenerator = yield call(
      httpGetMediaStatus,
      currentPlaylist.playlist_id
    );

    yield put(setMediaStatus(resp));

    yield delay(1500);
    yield put({ type: Types.SET_REFRESH_STATUS_LOADER, payload: false });

    yield put(getPlaylistMedia({ playlist_id: currentPlaylist.playlist_id }));
  } catch (e: any) {
    toast.error(e?.response?.data?.detail, {
      style: { background: "#333", color: "#fff" },
    });
    console.log("GET_STATUS", e?.response?.data);
    yield put({ type: Types.SET_REFRESH_STATUS_LOADER, payload: false });
  }
}

function* deleteAccount({ payload }: any) {
  yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: true });

  try {
    const resp: ResponseGenerator = yield call(
      httpDeleteAccount,
      payload.password
    );

    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });

    toast.success(`Account deleted.`, {
      style: { background: "#333", color: "#fff" },
    });

    yield delay(1500);
    window.location.href = "/";
    yield put(userLogout());
  } catch (e: any) {
    toast.error(e?.response?.data?.detail, {
      style: { background: "#333", color: "#fff" },
    });
    console.log("DELETE_ACCOUNT", e?.response?.data);
    yield put({ type: Types.SET_USER_PROFILE_LOADER, payload: false });
  }
}

function* watcher() {
  yield all([takeLatest(Types.GET_USER_PLAYLISTS, getAllUserPlaylists)]);
  yield all([takeLatest(Types.GET_PLAYLIST_MEDIA, getUserPlaylistMedia)]);
  yield all([takeLatest(Types.POST_NEW_PLAYLIST, createNewPlaylist)]);
  yield all([takeLatest(Types.POST_UPDATE_PLAYLIST, updatePlaylist)]);
  yield all([takeLatest(Types.POST_FIND_MEDIA, findMedia)]);
  yield all([takeLatest(Types.POST_DELETE_MEDIA, deleteMedia)]);
  yield all([takeLatest(Types.POST_ADD_MEDIA, addMediaToPlaylist)]);
  yield all([takeLatest(Types.POST_UPDATE_USER_PROFILE, updateUserProfile)]);
  yield all([takeLatest(Types.POST_CHANGE_PASSWORD, changeUserPassword)]);
  yield all([takeLatest(Types.POST_DELETE_PLAYLIST, deletePlaylist)]);
  yield all([takeLatest(Types.UPLOAD_VIDEO, uploadVideo)]);
  yield all([takeLatest(Types.GET_MEDIA_STATUS, mediaStatus)]);
  yield all([takeLatest(Types.POST_DELETE_ACCOUNT, deleteAccount)]);
}

export const dashboardSaga = watcher;
