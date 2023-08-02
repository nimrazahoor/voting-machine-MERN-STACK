import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace this with your backend API URL
const token = sessionStorage.getItem('jwt');
const userType = sessionStorage.getItem('userType');
const poll = sessionStorage.getItem('poll')
const applyCandidate = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/apply-candidate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
const login = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const castVote = async (candidateId) => {
    try {
      console.log(candidateId,"at api")
      const response = await axios.post(
        `${BASE_URL}/addVote`,
        { candidateId} ,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      throw new Error("Error while casting vote");
    }
  };

  const fetchCandidates = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/candidatesByConstituency`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching candidates");
    }
  };
  const fetchWinners = async (name) => {
    try {
      console.log(name);
      const response = await axios.get(`${BASE_URL}/allResults?name=${name}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching candidates");
    }
  };
  
  const fetchVotersByCandidate = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/getvotersbyCandidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching voters");
    }
  }; 
  const fetchVotesCastedToCandidate = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/getVotesCastedToCandidate`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error("Error fetching voters");
    }
  }; 

   const fetchConstituencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/constituencies`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching constituencies");
    }
  };
  
  const signup = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  const fetchAppliedCandidates = async (token, userType) => {
    try {
      const response = await axios.get(`${BASE_URL}/applied-candidates`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'UserType': `${userType}`
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error('Error fetching candidates:', error);
    }
  };

  const approveCandidate = async (token, userType, candidateId) => {
    try {
      await axios.put(
        `${BASE_URL}/approve-candidate/${candidateId}`,
        userType,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'UserType': `${userType}`
          },
        }
      );
  
      return true;
    } catch (error) {
      console.error('Error approving candidate:', error);
      throw error;
    }
  };
  const createConstituency = async (constituency, token, userType) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-constituency`, constituency, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'UserType': `${userType}`
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error creating Constituency:', error);
    }
  };
  const getScheduledElections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getScheduledElections`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching scheduled elections:', error);
    }
  };
  
  const endPolling = async (electionId, token, userType) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/endPolling`,
        { electionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userType: `${userType}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      throw new Error('Error ending polling:', error);
    }
  };
  const scheduleElection = async (electionData, token, userType) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/scheduleElection`,
        electionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            UserType: `${userType}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error scheduling election");
    }
  };

  const getInvitedUser = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/getinvitedUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching invited user data.");
    }
  };
  
  const confirmAdmin = async (token) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/confirmAdmin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userType: `${sessionStorage.getItem("userType")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error confirming admin status.");
    }
  };
  const getAllUsersOtherThanAdmin = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllUsersOtherThenAdmin`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          usertype: `${sessionStorage.getItem("userType")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users data.");
    }
  };
  
  const inviteUser = async (selectedUser, constituency, cnic, token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/inviteUser`,
        {
          userId: selectedUser,
          constituency:constituency,
          cnic:cnic,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            usertype: `${sessionStorage.getItem("userType")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error inviting user.");
    }
  };
  const startPolling = async (token, userType, duration, electionId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/startPolling`,
        { duration, electionId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            userType: `${userType}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error starting polling.");
    }
  };
  
export { applyCandidate,login ,castVote,fetchCandidates,fetchVotersByCandidate,startPolling,
    signup,fetchConstituencies,approveCandidate,fetchAppliedCandidates,
    scheduleElection,createConstituency,endPolling,getScheduledElections
   ,getInvitedUser, confirmAdmin,inviteUser,getAllUsersOtherThanAdmin,fetchVotesCastedToCandidate,fetchWinners
};
