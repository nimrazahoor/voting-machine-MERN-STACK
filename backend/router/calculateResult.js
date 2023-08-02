const express = require("express");
const router = express.Router();
const { Vote, Candidate, User,Constituency,Result } = require("../modals/modals"); 
const authenticateUserByToken = require("../middleware/authenticate");

router.get("/calculateResults", authenticateUserByToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    const constituency = user.constituency;
    console.log("constituency",constituency)
    const userConstituency = await Constituency.findOne({name: constituency})
    console.log("userConstituency",userConstituency)
    const userConstituencyId = userConstituency._id;
    console.log("userConstituency",userConstituencyId)

    const all_candidates = await User.find({constituency:user.constituency , isCandidate:true})
    const candidateUserIds = all_candidates.map((candidate) => candidate._id);
    const candidates = await Candidate.find({
      user: { $in: candidateUserIds },
      approved: true,
    }).catch((error) => {
      console.error("Error fetching candidates:", error);
    });
    let winnerCandidate = null;
    let maxVotes = 0;
    let numVotes = 0;
    if (candidates.length > 0) {
      for (const candidate of candidates) {
        const votes = await Vote.find({
          candidate: candidate._id,
          constituency: constituency,
        });
        numVotes = votes.length;
        console.log("voters",candidate.voters.length);
        if (numVotes > maxVotes) {
          maxVotes = numVotes;
          winnerCandidate = candidate;
        }
        
      }
    }
    const winnerUserId = winnerCandidate.user;
    const winnerPartyName = winnerCandidate.partyName;
    const winnerUser = await User.findOne({ _id: winnerUserId });
    
    const winner = {
      constituency: userConstituencyId,
      name: winnerUser.username,
      partyName: winnerPartyName,
      total_votes:maxVotes,
      votes_to_candidate : winnerCandidate.voters.length,
    }
    const existingResult = await Result.findOne({ constituency: userConstituencyId });

    if (existingResult) {
      existingResult.name = winner.name;
      existingResult.partyName = winner.partyName;
      existingResult.total_votes = winner.total_votes;
      existingResult.votes_to_candidate = winner.votes_to_candidate;

      await existingResult.save();
    } else {
      const result = new Result(winner);
      await result.save();
    }
    console.log("Winner user",winner.name)

    return res.status(200).json(winner);
  } catch (error) {
    console.error("Error calculating results:", error);
    res.status(500).json({ error: "Error calculating results." });
  }
});

module.exports = router;
