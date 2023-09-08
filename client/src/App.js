import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Createpost from './pages/Createpost';
import Home from "./pages/Home";
import Post from './pages/Post';

function App() {
  return (
  <div className="App">
    <Router>
      <Link to="/post">Create A Post</Link><br></br>
      <Link to="/">Homepage</Link>
    </Router>
  <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post" element={<Createpost />} />
    <Route path="/display/:id" element={<Post />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
