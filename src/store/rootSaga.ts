import { all } from "redux-saga/effects";
import { authSaga } from "../plaitv/Auth/saga";
import { dashboardSaga } from "../plaitv/Dashboard/saga";

export default function* rootSaga() {
  try {
    yield all([authSaga(), dashboardSaga()]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
