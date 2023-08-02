import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getScheduledElections, endPolling } from "../APIcalls/APIs";
import PollingControl from "../Polling/PollingControl";

function ScheduledElections() {
  const [scheduledElections, setScheduledElections] = useState([]);
  const [showPolling, setShowPolling] = useState(false);
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");

  useEffect(() => {
    const fetchScheduledElections = async () => {
      try {
        const response = await getScheduledElections();
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
      const response = await endPolling(electionId, token, userType);
      sessionStorage.removeItem("poll");
      alert("Poll Ended");
      window.location.reload(false);
      console.log("Polling ended:", response);
    } catch (error) {
      console.error("Error ending polling:", error);
    }
  };

  return (
    <div>
      <h1 className="mt-5">Scheduled Elections</h1>
      <div className="row">
        {scheduledElections.map((election) => (
          <div key={election._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{election.name}</h5>
                <p className="card-text">Start Date: {new Date(election.start_date).toLocaleDateString()}</p>
                <p className="card-text">End Date: {new Date(election.end_date).toLocaleDateString()}</p>
                {userType === "Admin" && (
                  <div>
                    {!showPolling ? (
                      <button className="btn btn-primary" onClick={() => handlePolling(election._id)}>
                        Start Polling
                      </button>
                    ) : (
                      <PollingControl electionId={election._id} />
                    )}

                    {showPolling ? (
                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => handleEndPolling(election._id)}
                      >
                        End Polling
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduledElections;
