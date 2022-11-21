import { put, call } from "redux-saga/effects";
import { validateEmail } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";

import { setValidateData } from "./actions";

export function* postValidate({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(validateEmail, {
      email_token: payload,
    });

    yield put(setValidateData(resp));
  } catch (e: any) {
    yield put(setValidateData(e?.response?.data));
  }
}
