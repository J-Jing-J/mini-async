// 有多个saga时可以使用rootSaga

// import { all } from "redux-saga/effects";
import { all } from "../saga-nut/effects";

import loginSaga from "./loginSaga";

export default function* rootSaga(params) {
  yield all([loginSaga()]);
}