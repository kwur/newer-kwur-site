
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Scheduler from './Components/Scheduler';
import NoPage from './Components/NoPage';
import Listen from './Components/Listen';
import About from './Components/About';
import Calendar from './Components/Calendar';
import Resources from './Components/Resources';
import Services from './Components/Services';
import Join from './Components/Join';
import Support from './Components/Support';
import Contact from './Components/Contact';
import ExecHome from './Components/ExecHome';
import UserSearch from './Components/UserSearch';
import AccountVerification from './Components/AccountVerification';
import HandleGMRequest from './Components/HandleGMRequest';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/join" element={<Join />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dj/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dj/scheduler" element={<Scheduler />} />
          <Route path="/dj/exec" element={<ExecHome />} />
          <Route path="/dj/accountVerification" element={<AccountVerification />} />
          <Route path="/createGM" element={<HandleGMRequest />} />
          <Route path="/test" element={<UserSearch />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
  );
}

export default App;
