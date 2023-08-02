const jwt = require('jsonwebtoken');
const { User } = require('../modals/modals');

const authenticateUserByToken = async (req, res, next) => {
   console.log('middle ware working');
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log("Auth not found")
      return res.status(401).json({ error: 'Authorization token not found' });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });
    if (!user) {
      console.log("token dont match")
      return res.status(401).json({ error: 'User not found or invalid token' });
    }
    console.log("match")
    req.userId = user._id;
    next();
  } catch (error) {
    console.error('Error while authenticating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authenticateUserByToken;
