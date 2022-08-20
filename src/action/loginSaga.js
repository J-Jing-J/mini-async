// redux-saga:
// 作用：中间件，用于异步请求，比如网络请求，访问浏览器缓存
// 优点：让副作用管理更容易，执行更高效，测试更简单，处理故障更容易
// 核心：sagas都是generator实现的，使用同步的方式实现异步

// 和thunk比：适合复杂场景、同时拿到结果、请求的先后关系、避开回调地狱（async await也行）
// generator提供了异步编程解决方案：惰性求值（到yield才求值，指针到了才求值）：按顺序发请求，上面的yield执行了，返回结果后才会执行后面的
// yield后面是状态，可以是表达式

// 一些概念：
// saga：组合所有Effect，共同实现所需的控制流，用generator实现

// effect：
// yield后面的js对象，表达saga逻辑，包含描述副作用的信息
// 可以通过yield传达给middleware执行 --- 使saga与仓库创建连接
// 从generator里yield纯js对象以表达saga逻辑，这些js对象就是effect
// 可以通过 react-effect 包里提供的函数创建effect：如take、fork、put

// 创建Effect：
// redux-saga/effects库提供了函数创建effect
// yield put({type: LOGIN})：通过put创建effect对象

// saga使用步骤
// 1. dispatch action，派发action
// 2. 发起副作用
// 3.与数据仓库连接起来

// saga如何与仓库创建连接 ？
// 1. 创建能够运行的saga
// 2. 创建中间件，与thunk不同，saga需要手动执行generator拿到生成器对象
// 3. 把saga中间件与redux-store连接
// 4. 运行saga


// import { call, put, takeEvery, take, fork } from "redux-saga/effects";
import { call, put, take, fork } from "../saga-nut/effects";

import LoginService from "../service/login";
import {
  LOGIN_FAILURE,
  LOGIN_SAGA,
  LOGIN_SUCCESS,
  REQUEST,
} from "../store/const";

// 使用saga第二步：发起副作用
// saga的login处理函数
function* loginHandle(action) {
  yield put({ type: REQUEST });
  try {
    // 按顺序发起请求
    // call：调用异步操作
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    // 把数据存到redux仓库里
    // put：状态更新，背后是dispatch
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    // 把失败信息更新到redux里
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// 使用saga第一步：dispatch action，派发action
// 监听的saga函数 （watcher saga）
// take：监听一次
// takeEvery：一直监听、写法更简单
function* loginSaga() {
  //   yield takeEvery(LOGIN_SAGA, loginHandle);

//   action的使用其实就是takeEvery的实现
  while (true) {
    const action = yield take(LOGIN_SAGA);
    // 要用call/fork执行一下，不然只会返回对象
    // call：会阻塞yield后面的执行
    // fork：不会阻塞yield后面的执行
    yield fork(loginHandle, action);
    console.log(111);
  }
}

export default loginSaga;