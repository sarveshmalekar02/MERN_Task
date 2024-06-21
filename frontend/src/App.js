import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Posts from './components/Posts/Posts'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element ={<Posts/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
