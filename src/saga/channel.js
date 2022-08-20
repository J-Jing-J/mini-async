import { MATCH } from "./symbol";

// 建立saga与redux之间的通信（不用这个只是操作了saga）
// channel：概括了这些 effects 与 外部事件源或saga 之间的通信
// take和put：redux-saga 与 redux store 通信
export function stdChannel() {
    // 项目中有多个saga，所以会传进来多个cb和matcher --- 修改各自的不能交叉 --- 用数组管理
  const currentTakers = [];

  function take(cb, matcher) {
    // matcher也会存到数组中，但是是通过给cb上加属性传递的
    cb[MATCH] = matcher;
    // 向数组中存cb
    currentTakers.push(cb);
  }

  //  接收的input就是action
  function put(input) {
    // 取到之前存到数组中的taker
    const takers = currentTakers;
     // 要先存一下len = takers.length，否则可能会陷入死循环：
    //  因为上面的take函数可能是不断执行的，length是动态的，每次取新的值会死循环
    for (let i = 0, len = takers.length; i < len; i++) {
      const taker = takers[i];
      if (taker[MATCH](input)) {
        // 若action匹配，执行
        taker(input);
      }
    }
  }

  return { take, put };
}