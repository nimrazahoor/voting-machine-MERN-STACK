import React, { useState, useEffect } from 'react';
import { fetchWinners, fetchConstituencies } from '../APIcalls/APIs';

function AllResultsConstituencies() {
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    fetchConstituencyNames();
  }, []);

  const fetchConstituencyNames = async () => {
    try {
      const response = await fetchConstituencies();
      setConstituencies(response);
    } catch (error) {
      console.error('Error fetching constituencies:', error);
    }
  };

  const handleConstituencyChange = (event) => {
    setSelectedConstituency(event.target.value);
  };

  const fetchWinnersByConstituency = async () => {
    try {
      const response = await fetchWinners(selectedConstituency);
      setWinners(response);
    } catch (error) {
      console.error('Error fetching winners:', error);
    }
  };

  return (
    <div className='container card w-25'>
      <h4>All Results - Constituencies</h4>
      <div>
        <label>Select Constituency: </label>
        <select  value={selectedConstituency} onChange={handleConstituencyChange}>
          <option value="">--Select Constituency--</option>
          {constituencies.map((constituency) => (
            <option key={constituency._id} value={constituency.name}>
              {constituency.name}
            </option>
          ))}
        </select>
        <br/>
        <br/>
        <button className="btn btn-success" onClick={fetchWinnersByConstituency}>Search</button>
      </div>
      {winners.length > 0 && (
        <div>
          <h2>Winners for {selectedConstituency}</h2>
          <ul>
            {winners.map((winner) => (
              <li key={winner._id}>
                {winner.name} - Party: {winner.partyName} - Won by : {winner.total_votes} Votes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AllResultsConstituencies;
