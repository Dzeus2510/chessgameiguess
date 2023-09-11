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
      <div className='navbar'>
      <Link to="/post">Create A Post</Link><br></br>
      <Link to="/">Homepage</Link><br></br>
      <Link to="/login">Login</Link><br></br>
      <Link to="/registration">Registration</Link><br></br>
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
  </div>
  );
}

export default App;
