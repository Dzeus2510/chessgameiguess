import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
  <div className="App">
    <Router>
      <Link to="/post">Create A Post</Link>
    </Router>
  <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post" element={<Home />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
