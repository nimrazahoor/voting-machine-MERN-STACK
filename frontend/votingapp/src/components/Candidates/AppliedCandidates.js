import React, { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

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
        const candidatesData = await fetchAppliedCandidates(token, userType); 
        setCandidates(candidatesData);
        console.log("party symbol",candidatesData.partySymbol)
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
    <h4>Applied Candidates</h4>
    <div className="card-container">
      <CloudinaryContext cloudName="dsz0qytqq">
        {candidates?.map((candidate) => (
          <div key={candidate._id} className="card">
            <Image
              publicId={candidate.partySymbol} 
                  alt="Party Logo"
              className="card__party-logo"
            />
            <p className="card__username">
              Candidate Name: {candidate.user.username}
            </p>
            <p className="card__party-name">Party Name: {candidate.partyName}</p>
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
      </CloudinaryContext>
    </div>
  </div>
  );
}

export default AppliedCandidates;
