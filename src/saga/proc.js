import { IO } from "./symbol";
import effectRunnerMap from "./effectRunnerMap";

// proc是process的意思
// 由于next数量不确定 --- 递归调用next
// 类似co：若想不用async函数想用generator，还要同步写法，就是使用这个库
export default function proc(env, iterator) {
    
  next();

//   递归调用next
  function next(arg, isErr) {
    let result;
    if (isErr) {
        // 如果有错误
      result = iterator.throw(arg);
    } else {
        // 没有错误执行next
      result = iterator.next(arg);
    }
    // 通过done判断是否结束了
    if (!result.done) {
        // 没有结束 --- 处理副作用，传next不断执行next直到结束
      digestEffect(result.value, next);
    }
  }

//   处理副作用
  function digestEffect(effect, cb) {
    let effectSettled; // effect是否执行完了
    // 当前的回调
    function currentCb(res, isErr) {
      if (effectSettled) {
        // effect执行完了
        return;
      }
    //   执行没执行完，设为完成状态，并执行next
      effectSettled = true;
      cb(res, isErr);
    }

    // 执行副作用
    runEffect(effect, currentCb);
  }

//   执行副作用
  function runEffect(effect, currentCb) {
    // effect指call、put等等
    // 有IO，说明是我们要处理的effect
    if (effect && effect[IO]) {
        // 找出要执行的那个effect
        // 从map方法里根据type取到对应的effect函数
      const effectRunner = effectRunnerMap[effect.type];
        //   执行effect，
        // env：传入与redux通信的东西
        // effect.payload：网络请求等可能会传进来的参数
        // currentCb：判断并执行next的回调
      effectRunner(env, effect.payload, currentCb);
    } else {
        // 如果没有effct，直接执行回调
      currentCb();
    }
  }
}