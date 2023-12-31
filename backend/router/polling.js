const express = require("express");
const router = express.Router();
const { Election, Poll, Candidate ,User,Vote} = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");

router.post("/startPolling", authenticateUserByToken, async (req, res) => {
  try {
    if (req.headers.usertype !== "Admin") {
      return res.status(404).json({
        message: "You cannot create constituency you are not admin ",
      });
    }
    const start_time = Date.now();
    const electionId = req.body.electionId;

    const election = await Election.findById(electionId);
    if(!election)
    {
      return res.status(400).json({
        message: "Elections not found",
      });
    }
    const durationInMinutes = Number(req.body.duration); 
    const durationInMilliseconds = durationInMinutes * 60 * 1000; 

    const endTime = start_time + durationInMilliseconds;
    const poll = new Poll({
      election:electionId,
      start_time: Date.now(),
      end_time: endTime,
      polling_duration : durationInMilliseconds,
    });

    poll.save();

    try {
      await Candidate.updateMany({}, { $set: { voters: [] } });
      await User.updateMany({}, { $set: { isVoted: false } });
      await Vote.deleteMany({})
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({ error: "Failed to fetch candidates" });
    }    
    return res.status(200).json(poll);
  } catch (error) {
    console.error("Error starting polling:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/endPolling", async (req, res) => {
  try {
    if (req.headers.usertype !== "Admin") {
      return res.status(404).json({
        message: "You cannot end Polling you are not admin ",
      });
    }
    const electionId = req.body.electionId;
    const expiredPolls = await Poll.find({ election: electionId });

    await Poll.deleteMany({ _id: { $in: expiredPolls.map(poll => poll._id) } });
    expiredPolls.duration = 0;
    
    res.status(200).json({ message: "Polling ended successfully" });
  } catch (error) {
    console.error("Error ending polling:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
