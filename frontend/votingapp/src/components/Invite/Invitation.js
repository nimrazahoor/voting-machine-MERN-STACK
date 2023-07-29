import React, { useState, useEffect } from "react";
import axios from "axios";
function Invitation() {
  const [results, setResults] = useState();
  useEffect(() => {
    fetchResults();
    console.log(results);
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getinvitedUser", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      console.log("response  data", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  const handleConfirmation = async () => {
    try {
      const response = await axios.put("http://localhost:5000/confirmAdmin",{}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          userType: `${sessionStorage.getItem("userType")}`,
        },
      });
      console.log("response  data", response.data);
      alert(response.data.message);
      setResults([]);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  return (
    <div>
      {results ? (
        <>
          <h3> You are Invited to become Admin!</h3>
          <button className="submit-button" onClick={handleConfirmation}>
            Confirm
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Invitation;
