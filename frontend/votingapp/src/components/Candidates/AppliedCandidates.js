import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppliedCandidates.css";
import { fetchAppliedCandidates, approveCandidate } from "../APIcalls/APIs";

function AppliedCandidates() {
  const [candidates, setCandidates] = useState([]);
  const token = sessionStorage.getItem("jwt");
  const userType = sessionStorage.getItem("userType");
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        alert('You must be logged in to apply for candidacy');
        return;
      }

      try {
        const candidatesData = await fetchAppliedCandidates(token, userType); // Use the fetchAppliedCandidates function from APIs.js
        setCandidates(candidatesData);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchData();
  }, [token, userType]);
  const handleApproval = async (candidateId) => {
    try {
      console.log("userType", userType);
      const success = await approveCandidate(token, userType, candidateId); 

      if (success) {
        alert('Approved')
        setCandidates(prevCandidates => {
          return prevCandidates.map(candidate => {
            if (candidate._id === candidateId) {
              
              return { ...candidate, approved: true };
            }
            return candidate;
          });
        });
      }
    } catch (error) {
      console.error('Error approving candidate:', error);
    }
  }
  return (
    <div>
      <h1>Applied Candidates</h1>
      <div className="card-container">
        {candidates?.map((candidate) => (
          <div key={candidate._id} className="card">
            <img
              src={`http://localhost:5000/images/${candidate.partySymbol}`}
              alt="Party Logo"
              className="card__party-logo"
            />
            <p className="card__username">
              Candidate Name: {candidate.user.username}
            </p>
            <p className="card__party-name">
              Party Name: {candidate.partyName}
            </p>
            {!candidate.isApproved && (
              <button
                className="submit-button"
                onClick={() => handleApproval(candidate._id)}
              >
                Approve as Candidate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedCandidates;
