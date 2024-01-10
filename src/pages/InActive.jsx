import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../redux/UserSlice";



const InActive = () => {
    let  dispatch = useDispatch()
let Navigate = useNavigate()

 const handleLogout = () => {
   dispatch(Logout())
   Navigate('/user-auth')
 };
  const { user } = useSelector((state) => state.user);
//   const [open, setOpen] = useState(true);
  const location = useLocation();


  let from = location?.state?.from?.pathname || "/";

//   if (user?.token) {
//     return window.location.replace(from);
//   }

if(!user.session.InActive){
 Navigate(from)
}
  return (
    // <div className='w-full '>
    //   <img src={Office} alt='Office' className='object-contain ' />

    //   <SignUp open={open} setOpen={setOpen} />
    // </div>
    <>
     <p>User is in active</p>
     <button onClick={handleLogout}>Click here to logout</button>
    </>
  );
};

export default InActive;