const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, Candidate, Vote, Poll } = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");
router.post("/addVote", authenticateUserByToken, async (req, res) => {
  const userId = req.userId;
  const candidateId = req.body.candidateId;
  try {
    const user = await User.findById(userId);
    if (user.isVoted) {
      return res
        .status(400)
        .json({ message: "Vote already casted. You can only vote once." });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    if (user.isVoted === true) {
      return res
        .status(400)
        .json({ message: "You have already voted for this candidate." });
    }
    const currentTime = Date.now();
    const poll = await Poll.find();
    if (poll.length === 0) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (currentTime < poll.start_time || currentTime > poll.end_time) {
      return res.status(400).json({
        message: "Polling is not currently active for the user's constituency.",
      });
    }
    const newVote = new Vote({
      voter: userId,
      candidate: candidateId,
      constituency: user.constituency,
    });

    candidate.voters.push(userId);
    user.isVoted = true;
    await candidate.save();
    await user.save();
    await newVote.save();
    return res.status(200).json({ message: "Vote cast successfully!" });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
