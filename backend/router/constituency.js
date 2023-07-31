const express = require("express");
const router = express.Router();
const { Constituency, Candidate } = require("../modals/modals");
const authenticateUserByToken = require("../middleware/authenticate");
router.post(
  "/create-constituency",
  authenticateUserByToken,
  async (req, res) => {
    try {
      console.log(req.headers);
      if (req.headers.usertype !== "Admin") {
        console.log("You are not admin");
        return res
          .status(404)
          .json({
            message: "You cannot create constituency you are not admin ",
          });
      }
      const { name, location } = req.body;
      const candidates = await Candidate.find({constituency : name});
      //console.log(Candidate.constituency)
      console.log("name--",name)
      const existingConstituency = await Constituency.findOne({ name });
      if (existingConstituency) {
        return res
          .status(400)
          .json({ error: "Constituency with the same name already exists" });
      }
      console.log("candidates",candidates)
      const newConstituency = new Constituency({ name, location ,candidates});
      await newConstituency.save();

      res
        .status(201)
        .json({
          message: "Constituency created successfully",
          constituency: newConstituency,
        });
    } catch (error) {
      console.error("Error creating Constituency:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get("/constituencies", async (req, res) => {
  try {
    const constituencies = await Constituency.find();
    res.status(200).json(constituencies);
  } catch (error) {
    console.error("Error fetching constituencies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
