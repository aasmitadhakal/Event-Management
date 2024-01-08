import React, { useState, useEffect,useRef } from 'react';
import axios from '../api/axios';

const CountdownTimer = () => {
  const [eventData, setEventData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const secondCircle = useRef();
  const hourCircle = useRef();
  const minuteCircle = useRef();

  const changeCircleoffset = (seconds, minutes, hours) => {
    if (hourCircle.current) {
      
      hourCircle.current.style.strokeDashoffset = `${
        hours > 0 ? 451 - (hours * 451) / 24 : 451
      }px`;
      minuteCircle.current.style.strokeDashoffset = `${
        minutes > 0 ? 451 - (minutes * 451) / 60 : 451
      }px`;
      secondCircle.current.style.strokeDashoffset = `${
        seconds > 0 ? 451 - (seconds * 451) / 60 : 451
      }px`;
    }
  };
  useEffect(() => {
    axios.get('event/choice/upcome/')
      .then(response => {
        setEventData(response.data.results[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const remaining = calculateTimeRemaining();
  //     setTimeRemaining(remaining);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [eventData]);
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
  
      if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        // If the countdown reaches zero
        changeCircleoffset(0, 0, 0); // Adjust circles
        clearInterval(interval); // Clear the interval
      } else {
        // Update countdown and circles
        changeCircleoffset(remaining.seconds, remaining.minutes, remaining.hours);
        setTimeRemaining({
          hours: remaining.hours,
          minutes: remaining.minutes,
          seconds: remaining.seconds,
        });
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [eventData]);

  const calculateTimeRemaining = () => {
    if (eventData) {
      const eventDateTime = new Date(`${eventData.date}T${eventData.time}`);
      const now = new Date();
      const timeDiff = eventDateTime.getTime() - now.getTime();

      if (timeDiff > 0) {
        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      } else {
        return { hours: 0, minutes: 0, seconds: 0 };
      }
    }
   
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const renderClock = () => {
    if (timeRemaining) {
      const { hours, minutes, seconds } = timeRemaining;

      return (
        <div className='bg-gradient-to-l sm:bg-gradient-to-t from-[#88adf1] to-[#374b9c] h-96 my-8'>
            <div className='flex justify-center items-center text-white text-3xl pt-8 font-bold'>Coming out soon</div>
        <div className="  flex  flex-col md:flex-row justify-center items-center ">
        
         <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf1] stroke-[8px]"
          ></circle>
          <circle
            r="70"
             ref={hourCircle}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: "440px",
            }}
            className="fill-transparent stroke-white  stroke-[8px]"
          ></circle>
        </svg>
        <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{hours}</span>
          <span className="text-center">
            {eventData?.hours == 1 ? "hours" : "hours"}
          </span>
        </div>
      </div>
      {/* //for minutes */}
      <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf1] stroke-[8px]"
          ></circle>
          <circle
            r="70"
             ref={minuteCircle}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: "451px",
            }}
            className="fill-transparent stroke-white  stroke-[8px]"
          ></circle>
        </svg>
        <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{minutes}</span>
          <span className="text-center">
            {eventData?.minutes == 1 ? "minutes" : "minutes"}
          </span>
        </div>
      </div>
         {/* for second */}
         <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf1] stroke-[8px]"
          ></circle>
          <circle
            r="70"
             ref={secondCircle}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: "451px",
            }}
            className="fill-transparent stroke-white  stroke-[8px]"
          ></circle>
        </svg>
        <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{seconds}</span>
          <span className="text-center">
            {eventData?.seconds == 1 ? "Second" : "Seconds"}
          </span>
        </div>
      </div>
        </div>
        </div>
    //   <div className="bg-[#191A24] h-screen">
    //   <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
    //     <span className="text-2xl sm:text-3xl font-semibold text-white text-center tracking-widest px-2">
    //       Book Now, Time is Short
    //     </span>
    //     <div className="flex justify-center gap-3 sm:gap-8">
        
    //       <div className="flex flex-col gap-5 relative">
    //         <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
    //           <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
    //             {hours}
    //           </span>
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
    //         </div>
    //         {/* <span className="text-[#8486A9] text-xs sm:text-2xl text-center font-medium">
    //           {countDownTime?.hours == 1 ? "Hour" : "Hours"}
    //         </span> */}
    //       </div>
    //       <div className="flex flex-col gap-5 relative">
    //         <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
    //           <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
    //             {minutes}
    //           </span>
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
    //         </div>
    //         {/* <span className="text-[#8486A9] text-xs sm:text-2xl text-center capitalize">
    //           {countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
    //         </span> */}
    //       </div>
    //       <div className="flex flex-col gap-5 relative">
    //         <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
    //           <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
    //             {seconds}
    //           </span>
    //           <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
    //         </div>
    //         {/* <span className="text-[#8486A9] text-xs sm:text-2xl text-center capitalize">
    //           {countDownTime?.seconds == 1 ? "Second" : "Seconds"}
    //         </span> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
      );
    }
    return null;
  };

  return (
    <div className="z-[-1]">
        <div className=" z-[-1] text-2xl">{renderClock()}</div>
     
    </div>
  );
};

export default CountdownTimer;