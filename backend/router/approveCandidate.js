// backend/router/candidates.js

const express = require("express");
const router = express.Router();
const { Candidate, User } = require('../modals/modals');
const authenticateUserByToken = require("../middleware/authenticate");
router.put('/approve-candidate/:candidateId',authenticateUserByToken, async (req, res) => {
  try {
    
    const candidateId = req.params.candidateId;
    const {usertype} = req.headers;
    //console.log(usertype,candidateId)
     if(usertype !== "Admin"){
      console.log("you are not Admin")
      res.status(500).json({ message: "You are not Admin" }
       )
       return;
     }
    await Candidate.findByIdAndUpdate(candidateId, { approved: true });
      
    const candidate = await Candidate.findById(candidateId).populate('user');

    if (candidate.user) {
      await User.findByIdAndUpdate(candidate.user._id, { isCandidate: true,userType: "Candidate" });
    }
    res.status(200).json({ message: "Candidate approved successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
