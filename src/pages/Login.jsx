/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUserAction } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../components/messages/ErrorMsg";

const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));

    setData({
      email: "",
      password: "",
    });
  };

  // Get data from Store
  const { loading, error, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button>Submit</button>

      {/* {error && <ErrorMsg message={error?.message} />} */}
    </form>
  );
};

export default Login;
