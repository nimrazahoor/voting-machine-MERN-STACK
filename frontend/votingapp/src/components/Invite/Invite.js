import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Invite = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [constituency, setConstituency] = useState("");
  const [cnic, setCnic] = useState("");
  const [results, setResults] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getAllUsersOtherThenAdmin",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            usertype: `${sessionStorage.getItem("userType")}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  const handleInvite = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/inviteUser",
        {
          userId: selectedUser,
          constituency,
          cnic,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            usertype: `${sessionStorage.getItem("userType")}`,
          },
        }
      );

      alert("Invitation sent successfully!");
      navigate('/admin-dashboard');
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  return (
    <div className="container card">
      <h2>Invite User</h2>
      <label htmlFor="userSelect">Select User:</label>
      <select
        id="userSelect"
        className="form-input"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option>Select Users by CNIC</option>
        {results?.map((user) => (
          <option key={user._id} value={user._id}>
            CNIC: {user.cnic} Constituency : {user.constituency}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button className="submit-button" onClick={handleInvite}>
        Invite User
      </button>
    </div>
  );
};

export default Invite;
