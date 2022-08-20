import { useDispatch, useSelector } from "react-redux";
import { logout } from "../action/user";

export default function UserPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  return (
    <div>
      <h3>UserPage</h3>
      <p>{user?.userInfo?.username}</p>
      <p>{user?.userInfo?.score}</p>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
    </div>
  );
}