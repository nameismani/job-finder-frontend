
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { BiChevronDown } from "react-icons/bi";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/UserSlice';
import { apiRequest } from '../utils';

const LevelUpCounter = React.forwardRef(() => {

  const {user} = useSelector(state=> state.user)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [workHours, setWorkHours] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(0);
  // console.log(user.userLogins.totalHours)
  useEffect(()=>{
      const sessionLoggedTime = new Date(user.userLogins.lastLoginTime).getTime();

        const totalSessionHours = new Date(user.userLogins.totalHours).getTime(); 

      if(user?.token){
        const intervalId = setInterval(() => {
          const now = new Date().getTime();
          const timeDifference = now - sessionLoggedTime;
          const totalTimeDifference = now - totalSessionHours
      
          if (timeDifference > 0) {
            // const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            const totalRemainingHours = Math.floor((totalTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const totalRemainingMinutes = Math.floor((totalTimeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const totalRemainingSeconds = Math.floor((totalTimeDifference % (1000 * 60)) / 1000);
          //   console.log(remainingHours,remainingMinutes,remainingSeconds)
            // setDays(remainingDays);
            setHours(remainingHours);
            setMinutes(remainingMinutes);
            setSeconds(remainingSeconds);
            setWorkHours(totalRemainingHours);
            setWorkMinutes(totalRemainingMinutes);
            setWorkSeconds(totalRemainingSeconds)
          } //else {
          //   // The session has expired, you can handle this accordingly
          //   handleLogout()
          //   clearInterval(intervalId);
          //   // Additional actions to take after the session expires
          // }
        }, 1000);
      }
      
          // Clear the interval when the component unmounts
          return () => clearInterval();
  },[])



return <>
{/* <h5>
{hours > 0 ? <span>{hours.toString().padStart(2, '0')}hours</span>:null}
{minutes > 0 ? <span>{minutes.toString().padStart(2, '0')}minutes</span>:null}
{seconds > 0 ? <span>{seconds.toString().padStart(2, '0')}seconds</span>:null}
</h5>
<h4>Total work hours</h4>
{workHours > 0 ?<span>{workHours.toString().padStart(2, '0')}hours</span>:null}
{workMinutes > 0 ?<span>{workMinutes.toString().padStart(2, '0')}minutes</span>:null}
{workSeconds > 0 ?<span>{workSeconds.toString().padStart(2, '0')}seconds</span>:null} */}

<Menu as='div' className='inline-block text-left'>
      <div className='flex'>
        <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
          <div className='leading[80px] flex flex-col items-start'>
            <p className='text-sm font-semibold '>
           History
            </p>
            {/* <span className='text-sm text-blue-600 '>
              {user?.jobTitle ?? user?.email}
            </span> */}
          </div>

          {/* <img
            src={user?.profileUrl || NoProfile}
            alt='user profile'
            className='w-10 h-10 rounded-full object-cover '
          /> */}
          <BiChevronDown
            className='h-5 w-5 text-slate-600'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
          <div className='p-1 '>

          <Menu.Item>
              {({ active }) => (
               <div className={` ${
                active ? "bg-blue-500 text-white" : "text-gray-900" }flex justify-between items-center hover:text-white rounded-md px-2 py-2 text-sm `}>
                <span className='text-xs font-bold'>Total login</span>
                 <div>
                {user.userLogins.totalLogins}
                 </div>
               </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
               <div className={` ${
                active ? "bg-blue-500 text-white" : "text-gray-900" }flex justify-between items-center hover:text-white rounded-md px-2 py-2 text-sm `}>
                <span className='text-xs font-bold'>Total login hours</span>
                 <div>
                 {workHours > 0 ?<span>{workHours.toString().padStart(2, '0')}hr</span>:null}
                {workMinutes > 0 ?<span>{workMinutes.toString().padStart(2, '0')}min</span>:null}
                 {workSeconds > 0 ?<span>{workSeconds.toString().padStart(2, '0')}sec</span>:null} 
                 </div>
               </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                 <div className={` ${
                  active ? "bg-blue-500 text-white" : "text-gray-900" }flex justify-between items-center hover:text-white rounded-md px-2 py-2 text-sm `}>
                  <span className='text-xs font-bold'>Curretnly up for</span>
                   <div>
                   {hours > 0 ? <span>{hours.toString().padStart(2, '0')}hr</span>:null}
{minutes > 0 ? <span>{minutes.toString().padStart(2, '0')}min</span>:null}
{seconds > 0 ? <span>{seconds.toString().padStart(2, '0')}sec</span>:null}
                   </div>
                 </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
               <div className={` ${
                active ? "bg-blue-500 text-white" : "text-gray-900" }flex justify-between items-center hover:text-white rounded-md px-2 py-2 text-sm `}>
                <span className='text-xs font-bold'>Last LogOut Time</span>
                 <div>
                {user.userLogins.lastLogoutTime?user.userLogins.lastLogoutTime:"No logout time is detected for today"}
                 </div>
               </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
</>;
})

export default LevelUpCounter;
