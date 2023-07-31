const cron = require('node-cron');
const {Poll, Election} = require('../modals/modals'); // Import your Poll model

// Function to delete expired polls
async function deleteExpiredPolls() {
  try {
    const currentTime = Date.now();

    const expiredPolls = await Poll.find({ end_time: { $lt: currentTime } });
    const expiredElections = await Poll.find({ end_date: { $lt: currentTime } });

    await Poll.deleteMany({ _id: { $in: expiredPolls.map(poll => poll._id) } });

    console.log(`${expiredPolls.length} expired polls deleted`);

    await Election.deleteMany({ _id: { $in: expiredPolls.map(election => election._id) } });

    console.log(`${expiredPolls.length} expired polls & ${expiredElections.length}expired Elections deleted`);

    
  

    console.log(`${expiredPolls.length} expired polls deleted`);
  } catch (error) {
    console.error('Error deleting expired polls:', error);
  }
}
module.exports = deleteExpiredPolls;
