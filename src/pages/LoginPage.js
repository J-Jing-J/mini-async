import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { login } from "../action/user";

export default function LoginPage(props) {
    // 登陆信息存到了redux，那修改登陆信息就要用redux的唯一修改方法：dispatch
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const location = useLocation();

//   拿到上次跳转过来的路径，登陆成功后跳回那里
  const from = location.state?.from.pathname || "/";

//   写在submit里判断会很乱很麻烦
// 现在还在当前页面，直接在页面里拿store信息校验
  if (user.isLogin) {
    // 组件不能通过命令式跳转，要通过组件的方式
    return <Navigate to={from} replace={true} />;
  }

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    dispatch(login({ username }));
  };

  return (
    <div>
      <h3>LoginPage</h3>

      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit">{user.loading ? "loading..." : "login"}</button>
      </form>

      <p className="red">{user.err.msg}</p>
    </div>
  );
}