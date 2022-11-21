import { put, call } from "redux-saga/effects";
import { createUser } from "../../../http/api/users";
import { ResponseGenerator } from "../../../http/types";

import { setRegisterData } from "./actions";

export function* postRegister({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(createUser, payload);

    yield put(setRegisterData(resp));
  } catch (e: any) {
    yield put(setRegisterData(e?.response?.data));
  }
}
