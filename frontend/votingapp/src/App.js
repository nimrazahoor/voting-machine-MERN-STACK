import React,{useState} from 'react'
import {BrowserRouter as Router , Routes, Route,Navigate } from 'react-router-dom'

import AdminDashboard from './components/Dashboard/AdminDashboard';
import Application from './components/Application/Application';
import CandidateDashboard from './components/Dashboard/CandidateDashboard';
import CreateHalka from './components/Constituency/CreateConstituency';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import VoterDashboard from './components/Dashboard/VoterDashboard';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import ScheduleElection from './components/Elections/ScheduleElection';
import PollingControl from './components/Polling/PollingControl';
import PageNotFound from './PageNotFound';
import Navbar from './components/Navbar/Navbar';
import ResultComponent from './components/Results/Result';
import Invite from './components/Invite/Invite';


function App() {

  return (
    <div className='App'> 
      <Navbar/>
     
      <div className='App'>
      <Router>
        <Routes>
          <Route path='/' Component={Signup}/>
          <Route path='/login' Component={Login}/>
          <Route path='/voter-dashboard' Component={VoterDashboard}/>
          <Route path="/admin-dashboard" Component={AdminDashboard}/>
          <Route path='/application' Component={Application}/>
          <Route path='/create-constituencies' Component={CreateHalka}/>
          <Route path='/candidate-dashboard' Component={CandidateDashboard}/>
          <Route path='/schedule-elections' Component={ScheduleElection}/>
          <Route path='/poll' Component={PollingControl}/>
          <Route path='/invite' Component={Invite}/>
          <Route path='*' Component={PageNotFound}/>
        </Routes>
      </Router>
      </div>

    </div>
  );
}

export default App;
