const express = require('express');
const router = express.Router();
const { Election } = require("../modals/modals");
const authenticateUserByToken = require('../middleware/authenticate');

router.post('/scheduleElection',authenticateUserByToken, async (req, res) => {
    try {
        if (req.headers.usertype !== "Admin") {
            console.log("You are not admin");
            return res
              .status(404)
              .json({
                message: "You cannot create constituency you are not admin ",
              });
          }
      const { electionName, startDate, endDate } = req.body;
      
      const alreadyExists = await Election.findOne({name:electionName})
      console.log("-------------------------",alreadyExists)
      if(alreadyExists)
      {
        res.status(201).json({ message: 'Elections with this name already scheduled!' }); 
      }
      const newElection = new Election({
        name: electionName,
        start_date: startDate,
        end_date: endDate,
      });
      
     await newElection.save();
  
      res.status(201).json({ message: 'Election scheduled successfully', election: newElection });
    } catch (error) {
      console.error('Error scheduling election:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/getScheduledElections', async (req, res) => {
    try {
      const elections = await Election.find();
      res.status(200).json(elections);
    } catch (error) {
      console.error('Error fetching scheduled elections:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  