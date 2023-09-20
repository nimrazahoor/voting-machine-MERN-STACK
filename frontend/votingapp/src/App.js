import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Application from "./components/Application/Application";
import CandidateDashboard from "./components/Dashboard/CandidateDashboard";
import CreateHalka from "./components/Constituency/CreateConstituency";
import Login from "./components/Authentication/Login";
import Invite from "./components/Invite/Invite";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./PageNotFound";
import PollingControl from "./components/Polling/PollingControl";
import PollingTimer from "./components/Polling/PollingTimer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ScheduleElection from "./components/Elections/ScheduleElection";
import Signup from "./components/Authentication/Signup";
import VoterDashboard from "./components/Dashboard/VoterDashboard";

import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <PollingTimer />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" Component={Signup} />
            <Route path="/login" Component={Login} />
            <Route path="/voter-dashboard" element={<ProtectedRoute Component={VoterDashboard} />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute Component={AdminDashboard} />} />
            <Route path="/create-constituencies" element={<ProtectedRoute Component={CreateHalka} />} />
            <Route path="/candidate-dashboard" element={<ProtectedRoute Component={CandidateDashboard} />} />
            <Route path="/schedule-elections" element={<ProtectedRoute Component={ScheduleElection} />} />
            <Route path="/poll" element={<ProtectedRoute Component={PollingControl} />} />
            <Route path="/invite" element={<ProtectedRoute Component={Invite} />} />
            <Route path="/application" element={<ProtectedRoute Component={Application} />} />

           
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
