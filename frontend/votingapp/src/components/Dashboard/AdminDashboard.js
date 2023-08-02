import { useNavigate } from "react-router-dom";

import AppliedCandidates from "../Candidates/AppliedCandidates";
import AllResultsConstituencies from "../Results/AllResultsConstituencies";
import ResultComponent from "../Results/Result";
import ScheduledElections from "../Elections/ScheduledElections";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <div>
          <AllResultsConstituencies />
        </div>
        <br/>
      <div className="wrapper">
       
        <div>
          <div className="card h-100">
            <h4>Invite Others to become Admin</h4>
            <button
              className="submit-button"
              onClick={() => navigate("/invite")}
            >
              Invite
            </button>
          </div>
         
        </div>

        <div >
          <ScheduledElections />
        </div>

        <div>
          <div className="container card h-100">
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

        <div>
          <div className="card h-100">
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
      <br/>
        <div className="wrapper">
          <div className="container card h-100">
            <AppliedCandidates />
          </div>
        </div>
    </div>
  );
}

export default AdminDashboard;
