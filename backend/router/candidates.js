const express = require("express");
const router = express.Router();
const { Candidate, User } = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");

router.get("/applied-candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find({ approved: false })
      .populate("user", "username")
      .select("partyName partySymbol");
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error while fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/getVotesCastedToCandidate",
  authenticateUserByToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({message:"User not found"});

      }
       const candidate = Candidate.findOne({ user: userId, approved: true });
       candidate.exec().then((candidate) => {
        if (!candidate) {
          return res.status(404).json({message:"Candidate not found"});

        } else {
          const VotersCount = candidate.voters?.length;
          return res.status(200).json(VotersCount);
        }
      });
    } catch (error) {
      console.error("Error while fetching Your Voters:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get(
  "/candidatesByConstituency",
  authenticateUserByToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({message:"User not found"});

      }
      const candidates = await User.find({
        isCandidate: true,
        constituency: user.constituency,
      });

      const candidateUserIds = candidates.map((candidate) => candidate._id);
      const CandidateUserName = candidates.map(
        (candidate) => candidate.username
      );
      Candidate.find({ approved: true, user: { $in: candidateUserIds } })
        .then((candidates) => {
          let all_candidates = candidates;
          let i = 0;
          let mergedArray = [];
          for (i in candidates) {
            mergedArray = all_candidates?.map((candidate, index) => ({
              _id: candidate._id,
              username: CandidateUserName[index],
              partyName: candidate.partyName,
              partySymbol: candidate.partySymbol,
            }));
          }
          return res.status(200).json(mergedArray);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Error while fetching candidates:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
