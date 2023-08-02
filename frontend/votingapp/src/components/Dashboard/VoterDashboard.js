import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CloudinaryContext, Image } from "cloudinary-react";

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
        console.log(candidatesData)
      } catch (error) {
        console.error("Error fetching candidates", error);
      }
    };
    fetchCandidatesData();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const message = await castVote(candidateId);
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
        
          <ScheduledElections />
        </div>
        <div className="container">
          
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
      </div>
      <div>
        <br />
        <h3>All Candidate Profiles</h3>
        <div>
        <CloudinaryContext cloudName="dsz0qytqq" className="wrapper">
        {candidates?.map((candidate) => (
          <div key={candidate._id} className="card">
            <Image
              publicId={candidate.partySymbol} 
                  alt="Party Logo"
              className="card__party-logo"
            />
            <p className="card__username">
              Candidate Name: {candidate.username}
            </p>
            <p className="card__party-name">Party Name: {candidate.partyName}</p>
             {!pollEnded?"":
             
              <button
                className="submit-button"
                onClick={() => handleVote(candidate._id)}
              >
                Vote
              </button>
             }
            
          </div>
        ))}
      </CloudinaryContext>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
