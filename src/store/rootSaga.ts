import { all } from "redux-saga/effects";
import { authSaga } from "../plaitv/Auth/saga";
import { dashboardSaga } from "../plaitv/Dashboard/saga";
import { exploreSaga } from "../plaitv/Explore/saga";

export default function* rootSaga() {
  try {
    yield all([authSaga(), dashboardSaga(), exploreSaga()]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
