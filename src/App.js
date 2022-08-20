import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import RequiredAuth from "./auth/RequiredAuth";

import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

// 路由守卫：判读是否登录、是否具有权限
export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="user"
              // RequiredAuth是登录的路由守卫，因为不止一个页面用到，所以抽出来
              element={
                <RequiredAuth>
                  <UserPage />
                </RequiredAuth>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout(props) {
  return (
    <div className="border">
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      {/* <Link to="/login">登录</Link> */}
      <Link to="/about">关于</Link>

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}