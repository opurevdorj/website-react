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

  const handleMyProfilePage = () => {
    navigate("/MyProfile");
  };

  const handleContactPage = () => {
    navigate("/Contact");
  };

  const isAdmin = user && user.email === "odnooguga@gmail.com";

  const handleAdminPage = () => {
    navigate("/Admin");
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
            <span
              onClick={handlePostsPage}
              style={{
                cursor: "pointer",
                color: darkTheme ? "#6d7d88" : "#fff",
              }}
            >
              Posts
            </span>
            <span
              onClick={handleMyProfilePage}
              style={{
                cursor: "pointer",
                color: darkTheme ? "#6d7d88" : "#fff",
              }}
            >
              My Profile
            </span>
            <span
              onClick={handleContactPage}
              style={{
                cursor: "pointer",
                color: darkTheme ? "#6d7d88" : "#fff",
              }}
            >
              Contact
            </span>
            {isAdmin && (
              <span
                onClick={handleAdminPage}
                style={{
                  cursor: "pointer",
                  color: darkTheme ? "#6d7d88" : "#fff",
                }}
              >
                Admin
              </span>
            )}
            <span
              onClick={handleSignOut}
              style={{
                cursor: "pointer",
                color: darkTheme ? "#6d7d88" : "#fff",
              }}
            >
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
