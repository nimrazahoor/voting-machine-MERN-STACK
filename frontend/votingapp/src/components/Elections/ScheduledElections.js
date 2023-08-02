import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PollingControl from "../Polling/PollingControl";
import { getScheduledElections, endPolling } from "../APIcalls/APIs";

function ScheduledElections() {
  const [scheduledElections, setScheduledElections] = useState([]);
  const [showPolling, setShowPolling] = useState(false);
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  useEffect(() => {
    const fetchScheduledElections = async () => {
      try {
        const response = await getScheduledElections(); // Use the getScheduledElections function from APIs.js
        setScheduledElections(response);
      } catch (error) {
        console.error("Error fetching scheduled elections:", error);
      }
    };

    fetchScheduledElections();
  }, []);
  const handlePolling = () => {
    setShowPolling(!showPolling);
  };
  const handleEndPolling = async (electionId) => {
    try {
      const token = sessionStorage.getItem("jwt");
      const userType = sessionStorage.getItem("userType");
      const response = await endPolling(electionId, token, userType); // Use the endPolling function from APIs.js
      sessionStorage.removeItem("poll");
      alert("Poll Ended");
      window.location.reload(false)
      console.log("Polling ended:", response);
    } catch (error) {
      console.error("Error ending polling:", error);
    }
  };
  return (
    <div>
      <ul className="container">
        <h1>Scheduled Elections</h1>
        {scheduledElections.map((election) => (
          <li key={election._id}>
            <h3>{election.name}</h3>
            <p>
              Start Date: {new Date(election.start_date).toLocaleDateString()}
            </p>
            <p>End Date: {new Date(election.end_date).toLocaleDateString()}</p>
            {userType === "Admin" ? (
              <div>
                <button
                  className="submit-button"
                  onClick={() => handlePolling(election._id)}
                >
                  Start Polling
                </button>

                {showPolling ? (
                  <PollingControl electionId={election._id} />
                ) : (
                  <button
                    className="submit-button"
                    onClick={() => handleEndPolling(election._id)}
                  >
                    End Polling
                  </button>
                )}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduledElections;
