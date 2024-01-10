import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/UserSlice';


const CountdownTimer = () => {
//   const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showSemicolon, setShowSemicolon] = useState(false);
  let  dispatch = useDispatch()
  let Navigate = useNavigate()
   const handleLogout = () => {
     dispatch(Logout())
     Navigate('/user-auth')
   };
const {user} = useSelector(state=> state.user)
// console.log(user)
  useEffect(() => {
    const sessionExpireTime = new Date(user.session.cookie.expires).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = sessionExpireTime - now;

      if (timeDifference > 0) {
        // const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      } else {
        // The session has expired, you can handle this accordingly
        handleLogout()
        clearInterval(intervalId);
        // Additional actions to take after the session expires
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='text-black'>
      {/* <div>{days} Days</div> */}
      <div>{hours} Hours</div>
      <div>{minutes} Minutes</div>
      <div>{seconds} Seconds</div>
    </div>
  );
};

export default CountdownTimer;
