import React, { useState, useEffect } from 'react';

const PollingTimer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [poll , setPoll] = useState(0)
  useEffect(() => {
    try {
        const storedPoll = sessionStorage.getItem('poll') || [];
        if (storedPoll) {
          setPoll(JSON.parse(storedPoll));
        }
      } catch (error) {
        console.error('Error parsing poll from sessionStorage:', error);
      }
    const currentTime = Date.now();
    const endTime = Date.parse(poll?.end_time); 
    const remainingTime = Math.max(0, endTime - currentTime);
    setRemainingTime(remainingTime);

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, endTime - currentTime);
      setRemainingTime(remainingTime);

      if (remainingTime === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [poll.end_time]);

  const formatTime = (time) => {
    if (!time) {
        return 'Poll Ended';
      }
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Time Remaining in Polling: {formatTime(remainingTime)}</h2>
    </div>
  );
};

export default PollingTimer;
