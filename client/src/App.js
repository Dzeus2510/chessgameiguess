import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import Createpost from './pages/Createpost';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Registration from "./pages/Registration";

function App() {
  const [authState, setAuthState] = useState({
    displayname: "",
    id: 0,
    status: false,
  });


  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!localStorage.getItem("accessToken")) {
          setAuthState({ displayname: "", id: 0, status: false });
        } else {
          const updatedAuthState = {
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
    setAuthState({ displayname: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              <Link to="/"> HomePage</Link>
              <Link to="/createpost"> Create A Post</Link>
              {!authState.status && (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
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
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;