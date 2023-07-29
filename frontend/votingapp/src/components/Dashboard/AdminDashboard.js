import React from "react";
import AppliedCandidates from "../Candidates/AppliedCandidates";
import CreateHalka from "../Constituency/CreateConstituency";
import Invite from "../Invite/Invite";
import { useNavigate } from "react-router-dom";
import ScheduledElections from "../Elections/ScheduledElections";

function AdminDashboard() {
  const navigate = useNavigate();
  // const handlePolling =()=>{

  // }
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
     <br/>
     <br/>
         <button className="submit-button" onClick={()=>navigate('/invite')}>Invite</button>
      <div className="wrapper">
        <div>
         <br/>
        </div>
      <div className="container">
        <AppliedCandidates />
      </div>
      <ScheduledElections/>
      <br/>
      
      </div>
    
      <br/>
      <div className="wrapper">
      <div className="container">
        <h1>

        Click Here for Creating Constituencies
        </h1>
        <br/> 
        <button className="submit-button" onClick={() => navigate("/create-constituencies")}>
          Create Constituencies
        </button>
      </div>
      <br/>
      <div className="container">
        <h1>
          Click Here for Schedule Elections
        </h1>
          <button className="submit-button" onClick={()=>navigate("/schedule-elections")}>
        Schedule Election
          </button>
        
      </div>
      </div>
     
      <div className="wrapper">

      </div>
    </div>
  );
}

export default AdminDashboard;
