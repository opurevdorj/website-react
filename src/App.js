import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { useUserContext } from '../src/components/UserContext'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactLoading from "react-loading";
import Login from "./pages/Login";
import Posts from "./pages/Posts/Posts";
import MyProfile from "./pages/MyProfile";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import SignUp from "./pages/SignUp";
import PostPage from "./pages/Posts/PostPage";

function App() {

  const {user, loading, isUserLoggedIn} = useUserContext()
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
            <Route path="/MyProfile" element={<MyProfile user={user} />} />
            <Route path="/Contact" element={<Contact user={user} />} />
            <Route path="/Admin" element={<Admin user={user} />} />
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
