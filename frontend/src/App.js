
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Scheduler from './Components/Scheduler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dj/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dj/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  );
}

export default App;
