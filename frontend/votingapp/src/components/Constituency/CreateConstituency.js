import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreateConstituency() {
  const [constituency, setConstituency] = useState({ name: '', location: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('jwt');
    const userType = sessionStorage.getItem('userType')
    try {
      console.log(constituency)
      const response = await axios.post('http://localhost:5000/create-constituency', 
        constituency, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'UserType' : `${userType}`
          },
        }
      );
      alert(response.data.message)
      setConstituency({ name: '', location: '' });
      navigate('/admin-dashboard')
    } catch (error) {
      console.error('Error creating Constituency:', error);
      alert(error)
    }
  };

  return (
    <div className='container'>
      <h1>Create Constituency</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Constituency Name:
          <input
            type="text"
            value={constituency.name}
            onChange={(e) => setConstituency({ ...constituency, name: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={constituency.location}
            onChange={(e) => setConstituency({ ...constituency, location: e.target.value })}
          />
        </label>
        <button className="submit-button" type="submit">Create Constituency</button>
      </form>
    </div>
  );
}

export default CreateConstituency;
