
const express = require('express');
const router = express.Router();
const { Election } = require("../modals/modals");
const authenticateUserByToken = require('../middleware/authenticate');

router.post('/startPolling', authenticateUserByToken,async (req, res) => {
    console.log("polling function workking  working")
    try {
        if (req.headers.usertype !== "Admin") {
            console.log("Working")
            console.log("You are not admin");
            return res
              .status(404)
              .json({
                message: "You cannot create constituency you are not admin ",
              });
          }
      const { electionId, pollingDuration } = req.body;
     console.log("req.body ",req.body)
      const election = await Election.findById(electionId);
     console.log("Election",election);
      if (!election) {
        return res.status(404).json({ error: 'Election not found' });
      }
  
      if (election.start_date <= Date.now()) {
        return res.status(400).json({ error: 'Polling has already started for this election' });
      }
  
      const end_date = new Date(Date.now() + pollingDuration * 60000);
  
      election.start_date = Date.now();
      election.end_date = end_date;
      election.polling_duration = pollingDuration;
  
      await election.save();
  
      res.status(200).json({ message: 'Polling started successfully' });
    } catch (error) {
      console.error('Error starting polling:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
router.post('/endPolling', async (req, res) => {
    try {
        if (req.headers.usertype !== "Admin") {
            console.log("You are not admin");
            return res
              .status(404)
              .json({
                message: "You cannot create constituency you are not admin ",
              });
          }
      const { electionId } = req.body;
  
      const election = await Election.findById(electionId);
  
      if (!election) {
        return res.status(404).json({ error: 'Election not found' });
      }
  
      if (!election.start_date || !election.end_date) {
        return res.status(400).json({ error: 'Polling has not been started for this election' });
      }
  
      if (election.end_date <= Date.now()) {
        return res.status(400).json({ error: 'Polling has already ended for this election' });
      }
  
      election.end_date = Date.now();
      await election.save();
  
      res.status(200).json({ message: 'Polling ended successfully' });
    } catch (error) {
      console.error('Error ending polling:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
  