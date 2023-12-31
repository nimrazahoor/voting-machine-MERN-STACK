const cron = require('node-cron');
const {Poll, Election} = require('../modals/modals'); 

async function deleteExpiredPolls() {
  try {
    const currentTime = Date.now();
    const expiredPolls = await Poll.find({ end_time: { $lt: currentTime } });
    const expiredElections = await Election.find({ end_date: { $lt: currentTime } });
    await Poll.deleteMany({ _id: { $in: expiredPolls.map(poll => poll._id) } });
    await Election.deleteMany({ _id: { $in: expiredElections.map(election => election._id) } });
    console.log(`${expiredElections.length} expired polls & ${expiredElections.length}expired Elections deleted`);
  } catch (error) {
    console.error('Error deleting expired polls:', error);
  }
}
module.exports = deleteExpiredPolls;
