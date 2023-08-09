import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "../components/Container";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <ToastContainer />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
