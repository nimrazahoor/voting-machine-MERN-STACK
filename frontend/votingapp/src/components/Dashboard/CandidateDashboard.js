import axios from "axios";
import React, { useState, useEffect } from "react";
import ScheduledElections from "../Elections/ScheduledElections";
import Invitation from "../Invite/Invitation";

function VotersList() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getVotersByCandidate",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`, // Add the authorization token (you should handle this in your authentication logic)
            },
          }
        );
        setVoters(response.data);
        console.log("voters", response.data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Invitations</h1>
        <Invitation />
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

export default VotersList;
