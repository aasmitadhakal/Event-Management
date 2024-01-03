import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { difference, ...timeLeft }; // Including 'difference' in the returned object
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = time;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        {time.difference > 0 ? (
          <div className="grid grid-cols-4 gap-4 text-3xl">
            <div>
              <span className="block text-center font-semibold text-4xl">{days}</span>
              <span className="block text-center">Days</span>
            </div>
            <div>
              <span className="block text-center font-semibold text-4xl">{hours}</span>
              <span className="block text-center">Hours</span>
            </div>
            <div>
              <span className="block text-center font-semibold text-4xl">{minutes}</span>
              <span className="block text-center">Minutes</span>
            </div>
            <div>
              <span className="block text-center font-semibold text-4xl">{seconds}</span>
              <span className="block text-center">Seconds</span>
            </div>
          </div>
        ) : (
          <div className="text-2xl font-semibold">Countdown ended!</div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;