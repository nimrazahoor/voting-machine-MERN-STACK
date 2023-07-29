import React, { useState } from 'react';
import axios from 'axios';

function Application() {
  const [partyName, setPartyName] = useState('');
  const [partySymbol, setPartySymbol] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data including the partySymbol file
    const formData = new FormData();
    formData.append('partyName', partyName);
    formData.append('partySymbol', partySymbol);
    console.log(partyName, partySymbol) 
    try {
      const token = sessionStorage.getItem('jwt');
      if (!token) {
        alert('You must be logged in to apply for candidacy');
        return;
      }
      const response = await axios.post('http://localhost:5000/apply-candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          
        },
      });

      // Handle the response
      console.log(response.data);
      alert(response.data.message);
      // Reset the form after successful submission
      setPartyName('');
      setPartySymbol(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to apply for candidacy');
    }
  };

  return (
    <div>
      <h1>Application for becoming Candidate</h1>
      <form className="container" onSubmit={handleSubmit}>
        <label htmlFor="partyName">Party Name:</label>
        <input
          type="text"
          id="partyName"
          name="partyName"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          required
        />

        <label htmlFor="partySymbol">Party Symbol:</label>
        <input
          type="file"
          id="partySymbol"
          name="partySymbol"
          accept="image/*"
          onChange={(e) => setPartySymbol(e.target.files[0])}
          required
        />
        <br /><br />
        <button className='submit-button' type="submit">Apply for Candidacy</button>
      </form>
    </div>
  );
}

export default Application;
