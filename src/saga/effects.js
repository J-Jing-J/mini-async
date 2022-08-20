import effectTypes from "./effectTypes";
import { IO } from "./symbol";


function makeEffect(type, payload) {
    // 原样返回对象，并加上IO
    // IO：saga把IO抽离了出来，在这里只是一个字符串
  return {
    [IO]: IO,
    type,
    payload,
  };
}

// 接收一个saga
// pattern：代表要匹配的saga类型
export function take(pattern) {
    // 返回对象 --- 这是一种副作用 --- 实现一个叫makeEffect的函数
    // 传入effect类型和saga
  return makeEffect(effectTypes.TAKE, { pattern });
}

// 接收action
export function put(action) {
  return makeEffect(effectTypes.PUT, { action });
}

// 执行异步函数
// 接受函数和其他的args
export function call(fn, ...args) {
  return makeEffect(effectTypes.CALL, { fn, args });
}

export function fork(fn, ...args) {
  return makeEffect(effectTypes.FORK, { fn, args });
}

// 接收多个effect
// 每个effect本质都是generator
export function all(effects) {
  return makeEffect(effectTypes.ALL, { effects });
}
