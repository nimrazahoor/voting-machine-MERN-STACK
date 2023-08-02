import React, { useState } from "react";
import { scheduleElection } from "../APIcalls/APIs";
import { useNavigate } from "react-router-dom";

function ScheduleElection() {
  const [electionData, setElectionData] = useState({
    electionName: "",
    startDate: "",
    endDate: "",
  });
  const token = sessionStorage.getItem("jwt");
  const userType = sessionStorage.getItem("userType");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setElectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scheduleElection(electionData, token, userType)
      .then((response) => {
        console.log("Election scheduled successfully:", response);
        alert("Elections Scheduled Successfully!");
        alert(response.message);
        navigate("/admin-dashboard");
      })
      .catch((error) => {
        alert("Error scheduling election");
        console.log("Error scheduling election:", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Election Schedule</h1>
        <label>Election Name:</label>
        <input
          className="form-input"
          type="text"
          name="electionName"
          value={electionData.electionName}
          onChange={handleChange}
          placeholder="Enter name of Elections"
        />
        <label>Start Date of Polling:</label>
        <input
          type="date"
          className="form-input"
          name="startDate"
          value={electionData.startDate}
          onChange={handleChange}
        />
        <label>End Date of Polling:</label>
        <input
          className="form-input"
          type="date"
          name="endDate"
          value={electionData.endDate}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ScheduleElection;
