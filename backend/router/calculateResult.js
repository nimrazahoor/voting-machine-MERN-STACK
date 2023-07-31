const express = require("express");
const router = express.Router();
const {  Vote, Candidate,User } = require("../modals/modals"); // Import the models
const authenticateUserByToken = require("../middleware/authenticate");

router.get("/calculateResults",authenticateUserByToken ,async (req, res) => {
  try {
    console.log('Working');;
    const userId = req.userId;
    const user = await User.findOne({_id:userId});
    const constituency = user.constituency;
    console.log("constituency--",constituency);
    const candidates = await Candidate.find({constituency:constituency,approved:true}).lean();
    console.log("candidate -----",candidates.length);
    let winnerCandidate = null;
    let maxVotes = 0;

    if (candidates.length > 0) {
      for (const candidate of candidates) {
        const votes = await Vote.find({ candidate: candidate._id, constituency: constituency });

        const numVotes = votes.length;
        console.log("Votes", numVotes);

        if (numVotes > maxVotes) {
          maxVotes = numVotes;
          winnerCandidate = candidate;
        }
    }
} 
     console.log("winner candidate",winnerCandidate.user)
     const winnerUserId = winnerCandidate.user;
     const winnerPartyName = winnerCandidate.partyName;
     console.log("winner party name",winnerPartyName);
     const winnerUserName = await User.findOne({_id:winnerUserId});
     console.log(winnerUserName.username);
     console.log("Won by votes",maxVotes);
     const winner = {
        id : winnerUserId,
        name : winnerUserName.username,
        partyName:winnerPartyName,

     }
     return res.status(200).json(winner);
  } 
  catch (error) {
    console.error("Error calculating results:", error);
    res.status(500).json({ error: "Error calculating results." });
  }
});

module.exports = router;
