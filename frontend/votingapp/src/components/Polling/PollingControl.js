import  { useState } from 'react';
import { useLocation } from 'react-router-dom';

import PollingTimer from './PollingTimer';
import { startPolling } from '../APIcalls/APIs'; 

function PollingControl({ electionId }) {
  const location = useLocation();
  const [poll, setPoll] = useState();
  const [duration, setDuration] = useState();

  const handleStartPolling = async () => {
    try {
      const response = await startPolling(
        sessionStorage.getItem("jwt"),
        sessionStorage.getItem("userType"),
        duration,
        electionId
      );
      setPoll(response);
      alert("Poll Started");
      window.location.reload(false);
    } catch (error) {
      alert("Error starting polling:"+ error.message);
    }
  };

  sessionStorage.setItem('poll', JSON.stringify(poll));

  return (
    <div>
      {poll && <PollingTimer />}
      <input
        type='number'
        className='form-input'
        placeholder='Enter Polling duration'
        onChange={(e) => setDuration(()=>e.target.value)}
      />
      <button className='submit-button' onClick={handleStartPolling}>Start</button>
    </div>
  );
}

export default PollingControl;
