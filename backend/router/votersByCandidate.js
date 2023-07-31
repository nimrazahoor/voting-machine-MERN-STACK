const express = require('express');
const router = express.Router();
const { User, Candidate } = require('../modals/modals');
const authenticateUserByToken = require('../middleware/authenticate');

router.get('/getvotersbyCandidate', authenticateUserByToken, async (req, res) => {
  try {
    const candidateUserId = req.userId;
    const candidate = await Candidate.findOne({ user: candidateUserId });
    if (!candidate) {
      return res.status(400).json({ error: 'Candidate not found' });
    } 
    const user = await User.findOne({_id: candidateUserId});
    const constituencyName = user.constituency;
    const voters = await User.find({ constituency: constituencyName, userType: 'Voter' });
    res.status(200).json(voters);
  } catch (error) {
    console.error('Error fetching voters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
