import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../components/Container";
import { registerUserAction } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { loading, error, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ username, email, password }));

    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="User Name"
        name="username"
        value={username}
        onChange={handleChange}
      />
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
    </form>
  );
};

export default Register;
