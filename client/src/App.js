import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Createpost from './pages/Createpost';
import Home from "./pages/Home";
import Login from './pages/Login';
import Post from './pages/Post';
import Registration from './pages/Registration';

function App() {
  return (
  <div className="App">
    <Router>
      <Link to="/post">Create A Post</Link><br></br>
      <Link to="/">Homepage</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
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
  </div>
  );
}

export default App;
