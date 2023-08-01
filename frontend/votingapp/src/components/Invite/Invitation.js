import React, { useState, useEffect } from "react";
import { getInvitedUser, confirmAdmin } from "../APIcalls/APIs"; 

function Invitation() {
  const [results, setResults] = useState();
  useEffect(() => {
    fetchResults();
    console.log(results);
  }, []);

  const fetchResults = async () => {
    try {
      const response = await getInvitedUser(sessionStorage.getItem("jwt"));
      console.log("response data", response);
      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error.message);
    }
  };
  const handleConfirmation = async () => {
    try {
      const response = await confirmAdmin(sessionStorage.getItem("jwt"));
      console.log("response data", response);
      alert(response.message);
      setResults([]);
    } catch (error) {
      console.error("Error confirming admin status:", error.message);
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
