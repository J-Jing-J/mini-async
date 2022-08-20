// 比其他middleware复杂：
// saga是generator，需要手动执行
// 惰性求值：手动执行生成器对象的next函数
// next函数有多少个不确定 --- 递归

// 创建saga中间件
export default function createSagaMiddleware() {

    let boundRunSaga

    // 中间件要接收getState, dispatch，获得操作redux的能力
    function sagaMiddleware({getState, dispatch}) {
        // 用runSaga执行所有saga函数，传入getState和getState赋予能力
        boundRunSaga = runSaga.bind(null, { channel, getState, getState });
        return (next) => (action) => {
            let result = next(action);
            // channel.put(action);
            return result;
        };
    }

    // run的是saga函数
    // 接收多个saga --- 最终处理redux状态值，但是操作redux的方法传给了sagaMiddleware --- 要使它和sagaMiddleware通信 --- boundRunSaga
    sagaMiddleware.run = (...args) => boundRunSaga(...args);

    // 返回 中间件函数，和thunk一样
    return sagaMiddleware
}