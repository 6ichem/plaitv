import { put, call } from "redux-saga/effects";
import { loginUser } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";

import { setLoginData } from "./actions";

export function* postLogin({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(loginUser, payload);

    yield put(setLoginData(resp));
  } catch (e: any) {
    yield put(setLoginData(e?.response?.data));
  }
}
