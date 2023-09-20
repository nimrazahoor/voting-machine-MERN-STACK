import  { useState, useEffect } from 'react';
import axios from 'axios';
const ResultComponent = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    fetchResults();
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
      <h4>Results</h4>
      <h3>Winner: {results?.name}</h3>
      <h3>Party:   {results?.partyName}</h3>
    </div>
  );
};

export default ResultComponent;
