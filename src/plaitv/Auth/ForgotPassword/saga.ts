import { put, call, select } from "redux-saga/effects";
import { forgotPassword } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";

import { setForgotCreds, setForgotData } from "./actions";

export function* postForgot({ payload }: any) {
  try {
    const {
      auth: {
        forgotState: { forgotCredentials },
      },
    } = yield select((state) => state);
    const { email } = forgotCredentials;

    const resp: ResponseGenerator = yield call(forgotPassword, { email });

    yield put(setForgotData(resp));
  } catch (e: any) {
    yield put(setForgotData(e?.response?.data));
  }
}
