import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ScheduledElections() {
  const [scheduledElections, setScheduledElections] = useState([]);
  const navigate = useNavigate();
  const userType = sessionStorage.getItem('userType')
  useEffect(() => {
    // Fetch scheduled elections from the backend
    axios.get('http://localhost:5000/getScheduledElections')
    
      .then((response) => {
        setScheduledElections(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scheduled elections:', error);
      });
  }, []);
  
  const handlePolling = (electionId,start_date,end_date) =>{
    console.log(electionId)
   // navigate('/poll', { state: { electionId: electionId ,start_date:start_date,end_date,end_date} });
  }
  return (
    <div>
      <ul className='container'>
    
      <h1>Scheduled Elections</h1>
        {scheduledElections.map((election) => (
          <li key={election._id}>
            <h3>{election.name}</h3>
            <p>Start Date: {new Date(election.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(election.end_date).toLocaleDateString()}</p>
            {userType === "Admin" ? (
      <button className="submit-button" onClick={() => handlePolling(election._id, election.start_date, election.end_date)}>
        Start Polling
      </button>
    ) : null}
             
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduledElections;
