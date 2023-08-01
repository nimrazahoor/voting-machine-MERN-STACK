import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { applyCandidate } from '../APIcalls/APIs';
function Application() {
  const [partyName, setPartyName] = useState('');
  const [partySymbol, setPartySymbol] = useState(null);
  const [pictureURL,setPictureURL]  = useState();
  const navigate = useNavigate();
 
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('partyName', partyName);
  formData.append('partySymbol', partySymbol);

  try {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      alert('You must be logged in to apply for candidacy');
      return;
    }

    const responseData = await applyCandidate(formData, token);
    console.log(responseData);
    alert(responseData.message);

    setPartyName('');
    setPartySymbol(null);
    navigate(-1);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to apply for candidacy: ' + error);
    navigate(-1);
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
