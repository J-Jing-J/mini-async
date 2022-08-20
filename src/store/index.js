import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import createSagaMiddleware from "redux-saga";
import createSagaMiddleware from "../saga";

// 运行saga第三步：连接redux仓库 --- 通过redux-saga创建中间件
// --
// !saga连接redux第一步：1. 创建要运行的saga
// import loginSaga from "../action/loginSaga";
import rootSaga from "../action/rootSaga";
import { loginReducer } from "./loginReducer";

// !saga连接redux第二步：2. 通过redux-saga创建saga中间件
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ user: loginReducer }),
  // !saga连接redux第三步：3. 把saga中间件与redux store链接
  applyMiddleware(sagaMiddleware)
);

// !saga连接redux第四步4. 运行saga
sagaMiddleware.run(rootSaga);

export default store;