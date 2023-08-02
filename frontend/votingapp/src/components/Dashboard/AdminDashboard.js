import React from "react";
import AppliedCandidates from "../Candidates/AppliedCandidates";
import CreateHalka from "../Constituency/CreateConstituency";
import Invite from "../Invite/Invite";
import { useNavigate } from "react-router-dom";
import ScheduledElections from "../Elections/ScheduledElections";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <div className="wrapper">

      <div className="container">

      <div className="card">
        <h2>Invite Others to become Admin</h2>
      <button className="submit-button" onClick={() => navigate("/invite")}>
        Invite
      </button>

      </div>
      </div>
    
        <div className="container">
          <AppliedCandidates />
        </div>
        <div className="container">
      <ScheduledElections />
        </div>
        
      
        <div className="container">
          <div className="card">

          <h1>Click Here for Creating Constituencies</h1>
          <br />
          <button
            className="submit-button"
            onClick={() => navigate("/create-constituencies")}
          >
            Create Constituencies
          </button>
          </div>
        </div>
        
        <div className="container">
          <div className="card">

          <h1>Click Here for Schedule Elections</h1>
          <button
            className="submit-button"
            onClick={() => navigate("/schedule-elections")}
          >
            Schedule Election
          </button>
          </div>
        </div>
      </div>
     
     
    </div>
  );
}

export default AdminDashboard;
