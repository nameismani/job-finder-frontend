import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../assets";
import { SignUp } from "../components";

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  let Navigate =  useNavigate()

  let from = location?.state?.from?.pathname || "/";

  if (user?.token) {
    setTimeout(()=>{
      Navigate(from)
      // window.location.replace(from)
    },0)
    // console.log('user exists')
  }
  return (
    <div className='w-full '>
      <img src={Office} alt='Office' className='object-contain ' />

      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;