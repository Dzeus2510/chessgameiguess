import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import ChangePassword from "./pages/ChangePassword";
import Createpost from './pages/Createpost';
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";

let nav = useNavigate()
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    displayname: "",
    id: 0,
    status: false,
  });


  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!localStorage.getItem("accessToken")) {
          setAuthState({ username: "", displayname: "", id: 0, status: false });
        } else {
          const updatedAuthState = {
            username: response.data.username,
            displayname: response.data.displayname,
            id: response.data.id,
            status: true,
          };
          setAuthState(updatedAuthState);
          // Store the updated status in local storage
          localStorage.setItem("authStatus", JSON.stringify(updatedAuthState));
        }
      });
  }, []);
  

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", displayname: "", id: 0, status: false });
    alert("Logged Out")
    nav("/login")
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                <Link to="/"> HomePage</Link>
                <Link to="/createpost"> Create A Post</Link>
                </>
              )}
              
            </div>
            <div className="loggedInContainer">
              <h1>{authState.displayname} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createpost" element={<Createpost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/changepassword" element={<ChangePassword/>} />

            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;