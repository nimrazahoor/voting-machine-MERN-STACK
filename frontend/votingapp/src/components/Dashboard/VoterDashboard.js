import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ScheduledElections from '../Elections/ScheduledElections';
import ResultComponent from '../Results/Result';
import Invitation from '../Invite/Invitation';

function VoterDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState();
  useEffect(() => {
    const fetchCandidates = async () => {

      try {
        const response = await axios.get('http://localhost:5000/candidatesByConstituency', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`, 
          },
        });
        setCandidates(response.data);
        console.log("candidates",response.data)
      } catch (error) {
        console.error('Error fetching candidates', error);
      }
    };

    fetchCandidates();
  },[]);
  const handleVote = async(candidateId) =>{
   console.log("candidate_id",candidateId);
   try {
    const response = await axios.post('http://localhost:5000/addVote', {candidateId},{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`, 
      },
    });
    console.log("Response",response.data.message)
    alert('Vote Casted Successfully ', response.data.message);
   setCandidates([]);
  } catch (error) {

    alert('You Cant Cast more then one Votes', error);
  }
  }
  return (
    <div>
      <ScheduledElections/>
      <ResultComponent/>
      <div className='container'>
        <h1>Invitations</h1>

      <Invitation/>
      </div>
      <h1 >Voter Dashboard</h1>
      <div className='wrapper'>
    <div className='container'>
      <h3>Apply Here for becoming a Candidate</h3>
      <button className='submit-button' onClick={()=>navigate('/application')}>Application for Candidate</button>
    </div>
    <div className='container'>
    <h3>All Candidates of Your Constituency</h3>
    <div>
    {candidates?.map((candidate) => (
      <li> {candidate.partyName}<br/> <button className='submit-button' onClick={()=>handleVote(candidate._id)}>Vote</button></li> 
       
      ))}
      
      

    </div>
    </div>
    </div>
         
    </div>
    
  )
}

export default VoterDashboard