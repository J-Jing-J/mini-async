

import proc from "./proc";

// 执行左右saga函数
export default function runSaga(
  { channel, getState, dispatch },
  saga,
  ...args
) {
    // 拿到生成器对象
  const iterator = saga(...args);
//   执行next函数 --- 有多少个next不确定 --- 递归
  proc({ channel, getState, dispatch }, iterator);
}