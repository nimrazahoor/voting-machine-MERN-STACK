import React, { useState, useEffect } from "react";
import axios from "axios";

const Invite = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [constituency, setConstituency] = useState("");
  const [cnic, setCnic] = useState("");
  const [results, setResults] = useState();

  useEffect(() => {
    fetchResults();
    console.log(results);
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
      console.log("response  data", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  const handleInvite = async () => {
    console.log("function working");
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
      console.log(response);

      alert("Invitation sent successfully!");
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  return (
    <div>
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
