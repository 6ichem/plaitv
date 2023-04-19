import { put, call } from "redux-saga/effects";
import { checkResetToken, resetPassword } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";

import { setCheckTokenData, setResetData } from "./actions";

export function* postCheckToken({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(checkResetToken, {
      password_reset_token: payload,
    });

    yield put(setCheckTokenData(resp));
  } catch (e: any) {
    yield put(setCheckTokenData(e?.response?.data));
  }
}

export function* postResetPassword({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(resetPassword, payload);

    yield put(setResetData(resp));

    setTimeout(() => {
      location.href = "/login";
    }, 1500);
  } catch (e: any) {
    yield put(setResetData(e?.response?.data));
  }
}
