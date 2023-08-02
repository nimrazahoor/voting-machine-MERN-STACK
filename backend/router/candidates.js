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
      console.log("CASTED------ ");
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        console.log("user not found");
      }
       console.log("user", user);
      // console.log("64c298e53f159469918e02dc" === "64c298e53f159469918e02dc");
       const candidate = Candidate.findOne({ user: userId, approved: true });
       candidate.exec().then((candidate) => {
        if (!candidate) {
          console.log("Candidate not found.");
        } else {
          console.log("Found candidate:", candidate);
          const VotersCount = candidate.voters?.length;
          console.log("voterslength--PPPPPPPPPP--", VotersCount);
          return res.status(200).json(VotersCount);
        }
      });
      console.log("Found candidate:", candidate);
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
        console.log("user not found");
      }
      // console.log(user.constituency);
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
