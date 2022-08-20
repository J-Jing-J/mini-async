

import {
    LOGIN_FAILURE,
    LOGIN_SAGA,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REQUEST,
  } from "../store/const";
  import LoginService from "../service/login";
  
//   场景：
//   两个请求取快的，抛弃慢的
//   都拿到结果之后再做某件事，类似all
//   解：rudex-saga

  // import co from "co";
  
  export const login1 = (userInfo) => ({ type: LOGIN_SUCCESS, payload: userInfo });
  
//   dispatch只能处理plain object，现在我们传了函数，这个传的函数的参数是dispatch --- thunk
  export const login2 = (userInfo) => (dispatch) => {
    dispatch({ type: REQUEST });
    LoginService.login(userInfo).then(
      (res) => {
        // 异步请求：先登录后请求别的
        // * 保证先后顺序的方法一：thunk + 嵌套
        // 缺点：容易嵌套地狱
        getMoreUserInfo(dispatch, res);
      },
      (err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      }
    );
  };
  
//   async await
  export const login3 = (userInfo) => {
    return async function (dispatch) {
      dispatch({ type: REQUEST });
      // 请求1： 用户登录
      let res1 = await loginPromise(dispatch, userInfo);
      // 请求2： 根据用户基本信息获取详细信息
      if (res1) {
        // * 保证顺序的法二：
        getMoreUserInfo(dispatch, res1);
      }
    };
  };
  

  export const login4 = (userInfo) => {
    return async function (dispatch) {
      dispatch({ type: REQUEST });
      // 请求1： 用户登录
      let res1 = await loginPromise(dispatch, userInfo);
      // 请求2： 根据用户基本信息获取详细信息
      if (res1) {
        getMoreUserInfo(dispatch, res1);
      }
    };
  };
  
  // export const loginPromise5 = (dispatch, userInfo) => {
  //   return LoginService.login(userInfo).then(
  //     (res) => {
  //       return res;
  //     },
  //     (err) => {
  //       dispatch({ type: LOGIN_FAILURE, payload: err });
  //     }
  //   );
  // };
  
  // export const getMoreUserInfo = (dispatch, userInfo) => {
  //   LoginService.getMoreUserInfo(userInfo).then(
  //     (res) => {
  //       dispatch({ type: LOGIN_SUCCESS, payload: res });
  //     },
  //     (err) => {
  //       dispatch({ type: LOGIN_FAILURE, payload: err });
  //     }
  //   );
  // };
  
  
  export const login = (userInfo) => ({ type: LOGIN_SAGA, payload: userInfo });
  
  export const logout = (userInfo) => ({
    type: LOGOUT_SUCCESS,
    payload: userInfo,
  });