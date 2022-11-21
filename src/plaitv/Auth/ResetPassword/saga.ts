import { put, call } from "redux-saga/effects";
import { validateEmail } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";

import { setResetData } from "./actions";

export function* postReset({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(validateEmail, {
      email_token: payload,
    });

    yield put(setResetData(resp));
  } catch (e: any) {
    yield put(setResetData(e?.response?.data));
  }
}
