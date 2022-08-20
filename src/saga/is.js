
export const func = (f) => typeof f === "function";

// 判断promise：上面then是不是函数类型
export const promise = (p) => p && func(p.then);