// 跟登录相关的权限不止一个页面用到 --- 单独抽出来
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// 登录的路由守卫，它包着需要校验的组件
export default function RequiredAuth({ children }) {
    // 登陆放在redux中，通过react-redux的provider传下来了
    // 函数组件用react-redux提供的useSelector拿到store
  const user = useSelector(({ user }) => user);
  const location = useLocation();

  if (user.isLogin) {
//   已登录
    return children;
  }

//   如果没登陆：跳转
// Link需要手动点击，Navigate自动跳转
// 记录当前路由，登陆后直接回来：state={{ from: location }}
// 登陆后回退不应该回到登录页： 加replace={true}
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
}