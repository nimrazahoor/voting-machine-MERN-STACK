import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ResultComponent = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    fetchResults();
    console.log(results);
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/calculateResults', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`, 
          },
        }); 
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className='card'>
      <h1>Results</h1>
      <h2>Winner: {results?.name}</h2>
      <h2>Party:   {results?.partyName}</h2>
    </div>
  );
};

export default ResultComponent;
