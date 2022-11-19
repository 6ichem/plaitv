import { put as putSaga, takeLatest, all } from "redux-saga/effects";
import * as Types from "./actionTypes";

function* postLogin({ payload }: any) {
  console.log(payload);

  yield;
}

function* watcher() {
  yield all([takeLatest(Types.SET_CREDS, postLogin)]);
}

export const loginSaga = watcher;
