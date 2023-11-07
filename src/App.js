import "./App.css";
import HomePage from "./pages/Home/HomePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/myfirebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Login from "./pages/Login";
import Posts from "./pages/Posts/Posts";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GetAccess from "./pages/GetAccess";

import SignUp from "./pages/SignUp";
import PostPage from "./pages/Posts/PostPage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsUserLoggedIn(true);
      } else {
        setUser(null);
        setIsUserLoggedIn(false);
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
    return () => getUser();
  }, []);
  return (
    <div className="App">
      {loading && (
        <div style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ReactLoading
        type="spinningBubbles"
        color="#0BBEF2"
        height={100}
        width={50}
          
        />
        </div>
        
      )}
      <BrowserRouter>
        {!loading && isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/Posts" element={<Posts user={user} />} />
            <Route path="/Posts/:id" element={<PostPage user={user} />} />
            <Route path="/Services" element={<Services user={user} />} />
            <Route path="/Contact" element={<Contact user={user} />} />
            <Route path="/GetAccess" element={<GetAccess user={user} />} />
          </Routes>
        )}
        {!loading && !isUserLoggedIn && (
          <Routes>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
