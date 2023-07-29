import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function PollingControl() {
  const [pollingDuration, setPollingDuration] = useState(60);
  const [remainingTime, setRemainingTime] = useState(null);

  const token = sessionStorage.getItem("jwt");
  const userType = sessionStorage.getItem("userType");
  const location = useLocation();
  const electionId = location.state.electionId;
  const start_date = location.state.start_date;
  const end_date = location.state.end_date;
  console.log(end_date)
  const handleStartPolling = () => {
    axios
      .post(
        "http://localhost:5000/startPolling",
        { electionId, pollingDuration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            UserType: `${userType}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("");
      })
      .catch((error) => {
        console.error("Error starting polling:", error);
      });
  };

  const handleEndPolling = () => {
    axios
      .post(
        "http://localhost:5000/endPolling",
        { electionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            UserType: `${userType}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error ending polling:", error);
      });
  };
  useEffect(() => {
    if (end_date) {
      const interval = setInterval(() => {
        const difference = new Date(end_date) - new Date();
        if (difference > 0) {
          const minutes = Math.floor(difference / 60000);
          const seconds = Math.floor((difference % 60000) / 1000);
          setRemainingTime(`${minutes} minutes and ${seconds} seconds`);
        } else {
          setRemainingTime(null);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [end_date]);
  
  return (
    <div>
      {start_date ? (
        <div>
          {end_date ? (
            <div>
              <h3>Polling has ended</h3>
            </div>
          ) : (
            <div>
              <h3>Polling is ongoing</h3>
              {remainingTime && <p>Time remaining: {remainingTime}</p>}
              <button onClick={handleEndPolling}>End Polling</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label>Set Polling Duration (in minutes):</label>
          <input
          className="form-input"
            type="number"
            value={pollingDuration}
            onChange={(e) => setPollingDuration(e.target.value)}
          />
          <br />
          <br />
          <button className="submit-button" onClick={handleStartPolling}>
            Start Polling
          </button>
        </div>
      )}
    </div>
  );
}

export default PollingControl;
