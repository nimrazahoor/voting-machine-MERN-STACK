const express = require('express');
const router = express.Router();
const {User} = require("../modals/modals");
const authenticateUserByToken = require('../middleware/authenticate');
router.get('/getAllUsersOtherThenAdmin', authenticateUserByToken, async (req, res) => {
    try {
        const userId = req.userId;
        if (req.headers.usertype !== "Admin") {
          return res
            .status(404)
            .json({
              message: "You cannot create constituency you are not admin ",
            });
        }
    const users = await User.find({ $or: [{ userType: 'Voter' }, { userType: 'Candidate' }] });
    return res.status(200).json(users);
    }catch (error) {
        console.error("Error Sending Users:", error);
        res.status(500).json({ error: "Error Sending Users." });
      }
});
router.post('/inviteUser', authenticateUserByToken, async (req, res) => {
    try {
      const userId = req.userId;
        const loggedInUser = await User.findById(userId);
      if (loggedInUser.userType !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to perform this action.' });
      }
  
      const { userId: invitedUserId, constituency, cnic } = req.body;
  
      const invitedUser = await User.findById(invitedUserId);
      if (!invitedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      invitedUser.isInvited = true;
      await invitedUser.save();
      return res.status(200).json({ message: 'Invitation sent successfully.' });
    } catch (error) {
      console.error('Error inviting user:', error)
      res.status(500).json({ error: 'Error inviting user.' });
    }
  });
  router.get('/getinvitedUser', authenticateUserByToken, async (req, res) => {
    try {
        const userId = req.userId;
       
    const user = await User.findOne({_id:userId, isInvited:true });
    return res.status(200).json(user);
    }catch (error) {
        console.error("Error Sending Users:", error);
        res.status(500).json({ error: "Error Sending Users." });
      }
});
router.put('/confirmAdmin',authenticateUserByToken,async(req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        user.userType = "Admin";
        user.save();
       return res.status(200).json({ message: "You are now Admin" });
    }catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error While making Admin" });
      }
})
  
  module.exports = router;
  