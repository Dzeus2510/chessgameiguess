import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from "./helpers/AuthContext";
import Createpost from './pages/Createpost';
import Home from "./pages/Home";
import Login from './pages/Login';
import Post from './pages/Post';
import Registration from './pages/Registration';

function App() {
  const [authState, setAuthState] = useState({ displayname: "", id: 0, status: false })

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({ displayname: response.data.displayname, id: response.data.id, status: true });
        }
      });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({ ...authState, status: false });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to="/post">Create A Post</Link>
            <Link to="/">Homepage</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <>
              <button onClick={logout}> Log Out </button>
              </>
            )}
              <p>{authState.displayname}</p>
            
          </div>
        </Router>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Createpost />} />
            <Route path="/display/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
