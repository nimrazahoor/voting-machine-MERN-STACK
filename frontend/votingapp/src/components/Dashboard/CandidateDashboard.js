import React, { useState, useEffect } from "react";
import ScheduledElections from "../Elections/ScheduledElections";
import Invitation from "../Invite/Invitation";
import {
  fetchVotersByCandidate,
  fetchVotesCastedToCandidate,
} from "../APIcalls/APIs";
import ResultComponent from "../Results/Result";
import AllResultsConstituencies from "../Results/AllResultsConstituencies";
function CandidateDashboard() {
  const [voters, setVoters] = useState([]);
  const [myVoters, setMyVoters] = useState(0);
  const [pollEnded, setPollEnded] = useState();

  useEffect(() => {
    setPollEnded(sessionStorage.getItem("poll"));
    const fetchVotersData = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        const votersData = await fetchVotersByCandidate(token);
        const votesCastedToCandidate = await fetchVotesCastedToCandidate();
        setMyVoters(votesCastedToCandidate);
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
            <AllResultsConstituencies/>
      <div className="container">
        <h4>Invitations</h4>
        <Invitation />
      </div>
      <div className="container">
        {!pollEnded ? <ResultComponent /> : ""}
        <div className="container">
          <h4>Votes Casted to you:</h4>
          <h5>{!pollEnded ? myVoters : ""}</h5>
        </div>
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
      <div className="container">
        <ScheduledElections />
      </div>
    </div>
  );
}

export default CandidateDashboard;
