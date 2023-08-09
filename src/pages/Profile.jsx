import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "../redux/slices/userSlice";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";

import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction());
  }, [dispatch]);

  const {
    profile: { data },
    loading,
    error,
  } = useSelector((state) => state?.users);

  return (
    <main className="profile">
      <div className="info">
        <AccountCircleOutlinedIcon />
        <h3>User Name:</h3>
        <div>{data?.username}</div>
      </div>
      <div className="info">
        <AlternateEmailOutlinedIcon /> <h3>Email:</h3>
        <div>{data?.email}</div>
      </div>
    </main>
  );
};

export default Profile;
