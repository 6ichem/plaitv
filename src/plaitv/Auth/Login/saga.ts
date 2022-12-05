import toast from "react-hot-toast";
import { put, call } from "redux-saga/effects";
import {
  getRefreshToken,
  issueAccessToken,
  loginUser,
} from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";
import {
  getLocalRefreshToken,
  setLocalAccessToken,
  setLocalAccessTokenExpiry,
  setLocalRefreshToken,
  setLocalUser,
} from "../../../http/utils";
import { SET_LOGIN_LOADER } from "../../Dashboard/actionTypes";
import { POST_REFRESH_TOKEN } from "../actionTypes";

import { setLoginData } from "./actions";

export function* postLogin({ payload }: any) {
  try {
    yield put({ type: SET_LOGIN_LOADER, payload: true });

    const resp: ResponseGenerator = yield call(loginUser, payload);

    yield put(setLoginData(resp));

    toast.success("Logged in successfully!", {
      style: { background: "#333", color: "#fff" },
    });

    const { access_token, user, access_token_expiry }: any = resp;

    setLocalAccessToken(access_token);
    setLocalAccessTokenExpiry(access_token_expiry);
    setLocalUser(user);

    yield put({ type: POST_REFRESH_TOKEN, payload: access_token });

    yield put({ type: SET_LOGIN_LOADER, payload: false });

    window?.location.replace("/home");
  } catch (e: any) {
    yield put({ type: SET_LOGIN_LOADER, payload: false });

    toast.error(e?.response?.data?.detail, {
      style: { background: "#333", color: "#fff" },
    });

    yield put(setLoginData(e?.response?.data));
  }
}

export function* postRefreshToken({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(getRefreshToken, {
      access_token: payload,
    });
    const { refresh_token }: any = resp;

    setLocalRefreshToken(refresh_token);
  } catch (e: any) {
    console.log("RefreshTokenErr", e);
  }
}
