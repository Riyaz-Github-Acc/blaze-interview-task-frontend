/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../redux/slices/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import Person3Icon from "@mui/icons-material/Person3";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import Container from "../components/Container";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  const loggedIn = userInfo?.data?.id;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAction({}));
    navigate("/login");
  };

  return (
    <header>
      <Container>
        <Link to="/">
          <h1>MERN Blog</h1>
        </Link>

        <nav>
          {loggedIn ? (
            <>
              <Link to="/create" className="link">
                Create Post
              </Link>
              <Link to="/profile">
                <Person3Icon />
              </Link>
              <Link onClick={handleLogout}>
                <LogoutIcon />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="link">
                Login
              </Link>
              <Link to="/register" className="link">
                Register
              </Link>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
