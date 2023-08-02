import React from "react";
import AppliedCandidates from "../Candidates/AppliedCandidates";
import CreateHalka from "../Constituency/CreateConstituency";
import Invite from "../Invite/Invite";
import { useNavigate } from "react-router-dom";
import ScheduledElections from "../Elections/ScheduledElections";
import AllResultsConstituencies from "../Results/AllResultsConstituencies";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <div className="wrapper">
      <AllResultsConstituencies/>

      <div className="container">

      <div className="card">
        <h4>Invite Others to become Admin</h4>
      <button className="submit-button" onClick={() => navigate("/invite")}>
        Invite
      </button>

      </div>
      </div>
    
        <div className="container">
          <div className="card">

          <AppliedCandidates />
          </div>
        </div>
        <div className="container">
         

      <ScheduledElections />
        
        </div>
        
      
        <div className="container">
          <div className="card">

          <h4>Click Here for Creating Constituencies</h4>
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

          <h4>Click Here for Schedule Elections</h4>
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
