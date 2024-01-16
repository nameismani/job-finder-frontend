import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { apiRequest } from "../utils";
import { CustomButton, TextInput } from "../components";
import { useForm } from "react-hook-form";


const ResetPassword = () => {
    const {token} = useParams()
    let Navigate = useNavigate()
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
useEffect(()=>{
     
    let verifyUrl = async ()=>{
        try{
            // console.log('render')
            if(!token){

              Navigate('/forgotpassword')
              return
            }else if(token.length <16){
                Navigate('/')
                return
            }
            let URL = `/auth/resetpassword?token=${token}`
            let res = await apiRequest({
                url:URL,
                method:"GET",
            })
         console.log(res.data)
            if(!res?.data?.success){
                Navigate(`${res?.data?.navigate}`)
            }
            // else{

            // }
        }catch(err){
        console.log(err)
        }
    }
    verifyUrl()
},[])

let onSubmit = async (data)=>{

    let URL = `/auth/resetpassword?token=${token}`
  // e.preventDefault()
  setIsLoading(true)
  try{
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
    //   console.log(res.data.token)
    setSuccessMsg(res?.data?.message)
      // window.location.replace(from);
      // Navigate(from)
     setTimeout(()=>  setSuccessMsg(""),1500)
    }
}catch(err){
    console.log(err)
}finally{
  setIsLoading(false)
}
}
  return <>
    <div className={`mb-2 w-1/2 mx-auto ${successMsg?"visible":"invisible"}`}>
    <span className={`block bg-green-500 w-3/4 text-white rounded-2xl p-5 mx-auto `}>{successMsg ? successMsg:"message"}</span>
  </div>
  <h2 className="text-center">ResetPassword</h2>
  <form   className='w-1/2 flex flex-col gap-5 mx-auto my-5'
  onSubmit={handleSubmit(onSubmit)}>
  <TextInput
name='newpassword'
label='newpassword'
placeholder='newpassword'
type='password'
register={register("newpassword", {
  required: "newpassword is required!",
})}
error={
  errors.newpassword ? errors.newpassword?.message : ""
}
  />

  <TextInput
   label='confirmPassword'
   placeholder='confirmPassword'
   type='password'
   register={register("confirmPassword", {
     validate: (value) => {
       const { newpassword } = getValues();

       if (newpassword != value) {
         return "confirmPassword do no match";
       }
     },
   })}
   error={
     errors.confirmPassword &&
     errors.confirmPassword.type === "validate"
       ? errors.confirmPassword?.message
       : ""
   }
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
  </>
};

export default ResetPassword;
