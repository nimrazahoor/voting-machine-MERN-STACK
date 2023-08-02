import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScheduledElections from "../Elections/ScheduledElections";
import ResultComponent from "../Results/Result";
import Invitation from "../Invite/Invitation";
import { fetchCandidates, castVote } from "../APIcalls/APIs";
import AllResultsConstituencies from "../Results/AllResultsConstituencies";
function VoterDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState();
  const [pollEnded, setPollEnded] = useState(false);
  useEffect(() => {
    setPollEnded(sessionStorage.getItem("poll"));
    const fetchCandidatesData = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        const candidatesData = await fetchCandidates(token);
        setCandidates(candidatesData);
        console.log("candidates", candidatesData);
      } catch (error) {
        console.error("Error fetching candidates", error);
      }
    };
    fetchCandidatesData();
  }, []);
  const handleVote = async (candidateId) => {
    console.log("candidate_id", candidateId);
    try {
      const token = sessionStorage.getItem("jwt");
      const message = await castVote(candidateId);
      console.log("Response : " + message);
      alert("Vote Casted Successfully: " + message);
      setCandidates([]);
    } catch (error) {
      alert("Error while casting vote: " + error.message);
    }
  };
  return (
    <div>
      <h1>Voter Dashboard</h1>

      <div className="wrapper">
        <br />
        <AllResultsConstituencies />

        <div className="container">
          {" "}
          <ScheduledElections />{" "}
        </div>
        <div className="container">
          {" "}
          {!pollEnded ? <ResultComponent /> : ""}
        </div>
        <div className="card">
           <h4>Invitations</h4>
           <Invitation />
        </div>
        <div className="container">
          <div className="card">
            <h3>Apply Here for becoming a Candidate</h3>
            <button
              className="submit-button"
              onClick={() => navigate("/application")}
            >
              Application for Candidate
            </button>
          </div>
        </div>
        <div className="container">
          <h3>All Candidates of Your Constituency</h3>
          <div>
            {candidates?.map((candidate) => (
              <div>
                <div className="card">
                  <strong>Candidate Name: </strong>
                  {candidate.username} <br />
                  <strong> Party Name: </strong> {candidate.partyName}
                  <br />
                  <br />
                  <button
                    className="submit-button"
                    onClick={() => handleVote(candidate._id)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
