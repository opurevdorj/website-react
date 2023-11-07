import React from "react";
import Logo from "../icons/Logo";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/myfirebase";
import { signOut } from "firebase/auth";
import LogoDark from "../icons/LogoDark";

function Header(props) {
  const { user, darkTheme } = props;

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHomePage = () => {
    navigate("/");
  };

  const handlePostsPage = () => {
    navigate("/Posts");
  };

  const handleServicesPage = () => {
    navigate("/Services");
  };

  const handleContactPage = () => {
    navigate("/Contact");
  };

  const handleGetAccess = () => {
    navigate("/Contact");
  };

  // const handleLoginPage = () => {
  //   navigate("/Login");
  // };

  // const handleGetAccessPage= () => {
  //   navigate("/GetAccess");
  // };

  return (
    <div className="headerContainer">
      <div className="header">
        <div>
          {darkTheme ? (
            <LogoDark onClick={handleHomePage} style={{ cursor: "pointer" }} />
          ) : (
            <Logo onClick={handleHomePage} style={{ cursor: "pointer" }} />
          )}
        </div>
        {user ? (
          <div className="menuItems">
            <span onClick={handlePostsPage} style={{ cursor: "pointer", color: darkTheme ? "#6d7d88" : "#fff"}}>
              Posts
            </span>
            <span onClick={handleServicesPage} style={{ cursor: "pointer", color: darkTheme ? "#6d7d88" : "#fff" }}>
              Services
            </span>
            <span onClick={handleContactPage} style={{ cursor: "pointer", color: darkTheme ? "#6d7d88" : "#fff" }}>
              Contact
            </span>
            <span onClick={handleGetAccess} style={{ cursor: "pointer", color: darkTheme ? "#6d7d88" : "#fff" }}>
              Get Access
            </span>
            <span onClick={handleSignOut} style={{ cursor: "pointer", color: darkTheme ? "#6d7d88" : "#fff" }}>
              Sign Out
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

// <span>Get Access</span>

export default Header;
