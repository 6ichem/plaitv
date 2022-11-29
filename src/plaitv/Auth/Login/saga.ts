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
  setLocalRefreshToken,
} from "../../../http/utils";

import { setLoginData } from "./actions";

export function* postLogin({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(loginUser, payload);

    yield put(setLoginData(resp));
  } catch (e: any) {
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
