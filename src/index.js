import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

createRoot(document.getElementById("root")).render(
// 跨层级传递store
// react-redux提供了Provider，背后是context
  <Provider store={store}>
    <App />
  </Provider>
);

// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// var hw = helloWorldGenerator();

// console.log("hw", hw); //sy-log
// //执行
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// let a = 0;

// function* fun() {
//   let aa = yield (a = 1 + 1);
//   console.log("aa", aa); //sy-log
//   return 100;
// }

// // console.log("fun0", a);
// let b = fun();
// console.log("fun0-0", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun0-1", b.next(-1));
// console.log("fun1", a);