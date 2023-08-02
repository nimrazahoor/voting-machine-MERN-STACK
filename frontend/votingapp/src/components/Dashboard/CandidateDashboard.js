import React, { useState, useEffect } from "react";
import ScheduledElections from "../Elections/ScheduledElections";
import Invitation from "../Invite/Invitation";
import { fetchVotersByCandidate } from "../APIcalls/APIs";
import ResultComponent from "../Results/Result";
function CandidateDashboard() {
  const [voters, setVoters] = useState([]);
  const [pollEnded, setPollEnded] = useState();
  
  useEffect(() => {
    setPollEnded(sessionStorage.getItem("poll"));
    const fetchVotersData = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        const votersData = await fetchVotersByCandidate(token);
        setVoters(votersData);
        console.log("voters", votersData);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    fetchVotersData();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Invitations</h1>
        <Invitation />

      </div>
      <div className="container">
      {!pollEnded ? <ResultComponent /> : ""}
      </div>
      <div className="container">
        <h1>List of Voters</h1>
        {voters.length === 0 ? (
          <p>No voters found.</p>
        ) : (
          <ul>
            {voters.map((voter) => (
              <li key={voter._id}>{voter.username}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <ScheduledElections />
      </div>
    </div>
  );
}

export default CandidateDashboard;
