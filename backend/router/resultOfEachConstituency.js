const express = require("express");
const router = express.Router();
const { Result, Constituency } = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");

router.get("/allResults", async (req, res) => {
  try {
    const constituencyName = req.query.name;
    const constituency = await Constituency.findOne({ name: constituencyName });
    
    if (!constituency) {
      return res.status(404).json({ error: "Constituency not found." });
    }
    const constituencyId = constituency._id;    
    const all_results = await Result.find({ constituency: constituencyId });
    return res.status(200).json(all_results);
  } catch (error) {
    console.error("Error fetching results:", error);
    return res.status(500).json({ error: "Error fetching results." });
  }
});

module.exports = router;
