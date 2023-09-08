import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Createpost from './pages/Createpost';
import Home from "./pages/Home";

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
    <Route path="/display" element={<Createpost />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
