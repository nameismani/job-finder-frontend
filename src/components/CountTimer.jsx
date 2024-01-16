import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/UserSlice';
import { apiRequest } from '../utils';


const CountdownTimer = () => {
//   const [days, setDays] = useState(0);
const {user} = useSelector(state=> state.user)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showSemicolon, setShowSemicolon] = useState(false);
  let  dispatch = useDispatch()
  let Navigate = useNavigate()
   const handleLogout = async () => {
    let URL = "auth/logout"
    let res = await apiRequest({
      url:URL,
       data:{id:user.session.userId},
      method:"POST",
    })

   if( res.data.success===true){
    dispatch(Logout())
    Navigate('/user-auth')
   }

   };

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
    <div className='text-black fixed bottom-4 right-2 md:bottom-10 md:right-5 '>
      {/* <div>{days} Days</div> */}
      {/* <div>{hours > 0 ? <span>{hours.toString().padStart(2, '0')}hr</span>: null} </div>
      <div className='ms-3'>{minutes>0 ?<span>{minutes.toString().padStart(2, '0')}min</span>:null}</div>
      <div  className='ms-3' >{seconds>0 ? <span>{seconds.toString().padStart(2, '0')}sec</span>: null} </div> */}
     <div className="flex justify-center itmes-center z-20 bg-orange-500 text-white p-2 md:p-5 rounded-2xl">
     <div>{hours.toString().padStart(2, '0')} hr</div>
      <div className='ms-3'>{minutes.toString().padStart(2, '0')} min</div>
      <div  className='ms-3' >{seconds.toString().padStart(2, '0')} sec</div>
     </div>
    </div>
  );
};

export default CountdownTimer;
