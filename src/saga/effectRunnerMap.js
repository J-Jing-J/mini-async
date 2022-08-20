import effectTypes from "./effectTypes";
import { promise } from "./is";
import proc from "./proc";

// pattern：匹配saga
// env上是getState、dispatch、channel
// channel不传时，默认会使用env上的channel
function runTakeEffect(env, { channel = env.channel, pattern }, cb) {
    匹配
  const matcher = (input) => input.type === pattern;
  channel.take(cb, matcher);
}

// 更新状态
function runPutEffect(env, { action }, cb) {
  const result = env.dispatch(action);
  cb(result);
}

// 阻塞调用
function runCallEffect(env, { fn, args }, cb) {
  const result = fn.apply(null, args);
//   这个以处理promise为例
  if (promise(result)) {
    // 如果是promise
    result.then((data) => cb(data)).catch((err) => cb(err, true));
    return;
  }
  cb(result);
}

// 非阻塞调用：与call的区别是cb的执行时机
function runForkEffect(env, { fn, args }, cb) {
    // apply为了加参数
    // fn是生成器，执行得到生成器对象
  const taskIterator = fn.apply(null, args);
//   递归调用生成器对象的next
  proc(env, taskIterator);
  cb();
}

// 执行多个effect(本质是generator)
function runAllEffect(env, { effects }, cb) {
  let n = effects.length;
  for (let i = 0; i < n; i++) {
    // 处理generator用proc
    proc(env, effects[i]);
  }
}

// 根据type值区分
const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect,
  [effectTypes.CALL]: runCallEffect,
  [effectTypes.FORK]: runForkEffect,
  [effectTypes.ALL]: runAllEffect,
};

export default effectRunnerMap;