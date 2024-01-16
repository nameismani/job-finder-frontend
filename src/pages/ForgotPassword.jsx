import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CustomButton, TextInput } from "../components";
import { useForm } from "react-hook-form";
import { apiRequest } from "../utils";


const ForgotPassword = () => {
  let [errMsg,setErrMsg] = useState("")
  let [successMsg,setSuccessMsg] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const Navigate = useNavigate()

  let onSubmit = async (data)=>{
    let URL = "/auth/forgotpassword"
  // e.preventDefault()
  try{
    setIsLoading(true)
    const res = await apiRequest({
      url:URL,
      data:data,
      method:"POST",
    });
  
    // console.log(res.data.success)
    if(!res?.data?.success){
      console.log("failed")
    
   

        setErrMsg(res?.data?.message);
 
    }else{
      setErrMsg("")

      console.log(res?.data)
      // console.log(res.data.token)
      setSuccessMsg(res?.data?.message)
      // window.location.replace(from);
      // Navigate(from)
      setTimeout(()=> setSuccessMsg(""),1000)
    }
  }catch(err){
    console.log(err)
  }finally{
    setIsLoading(false)
  }
  // console.log(data)
  }
  
  return <>
  
  <div className={`mb-2 w-1/2 mx-auto ${successMsg?"visible":"invisible"}`}>
    <span className={`block bg-green-500 w-3/4 text-white rounded-2xl p-5 mx-auto `}>{successMsg ? successMsg:"message"}</span>
  </div>
  <h2 className="text-center">ForgotPassword</h2>
  <form   className='w-1/2 flex flex-col gap-5 mx-auto my-5'
  onSubmit={handleSubmit(onSubmit)}>
  <TextInput
    name='email'
    label='Email Address'
    placeholder='email@example.com'
    type='email'
    register={register("email", {
      required: "Email Address is required!",
      validate: {
        maxLength: (v) =>
          v.length <= 100 || "The email should have at most 50 characters",
        matchPattern: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email address must be a valid address",
      },

    })}
    error={errors.email ? errors.email.message : ""}
  />


  <CustomButton
                        type='submit'
                        containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                        title="Submit"
                        isLoading={isLoading}
                      />
 

                          {errMsg && (
                      <span
                        role='alert'
                        className='text-sm text-red-500 mt-0.5'
                      >
                        {errMsg}
                      </span>
                    )}
  </form>

  </>;
};

export default ForgotPassword;
