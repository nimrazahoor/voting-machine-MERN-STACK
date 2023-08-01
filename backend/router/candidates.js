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
// router.get(
//   "/candidatesByConstituency",
//  authenticateUserByToken,
//   async (req, res) => {
//     try {
//       console.log("function working ")
//       const userId = req.userId;;
//       console.log(userId);
//       const user = await User.findOne({ _id: userId });
//       if(!user)
//       {
//         console.log("user not foun d")
//       }
//       console.log("user constituenct--", user.constituency);
//     //  const userConstituency = user.constituency;
//        const candidates = await User.find({
//       isCandidate: true,
//       constituency: user.constituency,
//     })

//       console.log("candidates------",candidates);
//       const userIds = candidates.map(candidate => candidate._id);
//       const userNames = candidates.map(candidate =>candidate.username);
//       console.log(userIds);
//       const candidateUserIds = userId;

//       // Find approved candidates with the given user IDs and populate the user details (username)
//      const all_candidates = await Candidate.find({ _id: { $in: candidateUserIds }, approved: true })
//         .populate('user', 'username')
//         .exec((err, candidates) => {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log(candidates);
//           }
//         });
//       res.status(200).json(all_candidates);
//     } catch (error) {
//       console.error("Error while fetching candidates:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );
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
         // console.log("candidates", candidates);
          let all_candidates = candidates;
          let i = 0;
          let mergedArray = [];
          for (i in candidates) {
                mergedArray = all_candidates?.map((candidate, index) => ({  
                _id : candidate._id, 
                username: CandidateUserName[index],
                partyName: candidate.partyName,
                partySymbol: candidate.partySymbol,
              }));
            
            
          }

       //   console.log("----------------------------",mergedArray);
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
