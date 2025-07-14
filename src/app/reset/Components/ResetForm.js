import React, { useState } from 'react'
import logo from "../../assets/Group 17.png"
import Image from 'next/image'
import { forgotPassword } from '@/app/services/services';
import Swal from 'sweetalert2';
import { updateLoaderState } from '@/app/store/slices/LoaderSlice';
import { useDispatch } from 'react-redux';
const ResetForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const forgotClick = () => {
    if(email == ''){
      setError('Please Enter Email');
    }else{
      if(isValidEmail(email)){
        setError('');
        dispatch(updateLoaderState(true));
        forgotPassword(email).then(
          (result)=>{
            if('email' in result){
              dispatch(updateLoaderState(false));
              Swal.fire({
                icon: "success",
                title: "Message Sent",
                text: "Please Check your mail and follow the instruction to reset password",
              });
            }else{
              dispatch(updateLoaderState(false));
              Swal.fire({
                icon: 'error',
                title: result.details,
                text: error,
              });
            }
          }
        ).catch((error)=>{
          dispatch(updateLoaderState(false));
          Swal.fire({
            icon: 'error',
            title: 'Error in Forgot Password',
            text: error,
          })
    
        });
      }else{
        setError('Email is Incorrect');
      }
    }
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

    
  return (
    
    <div className='bg-[#262626]  h-[400px] w-[420px] pt-[40px] pb-[10px] px-[50px] flex flex-col justify-between'>

      <div className='flex justify-center'>
          <Image src={logo}  className="w-[100px] md:w-[120px]" alt="logo" />
      </div>

      <div className='flex flex-col items-center gap-y-[23px]'>
      <h2 className='text-[#F7FCFD] text-[20px]'>Reset Password</h2>
      
      <input
          type="password"
          placeholder="Password"
          className="w-[100%] h-[30px] text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
        
          name="password"
        />
        <div className='w-[100%]'>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-[100%] h-[30px] text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
        
          name="password"
        />
        <div className='h-[25px] text-red-600 text-[12px] pt-[5px]'>{error}</div>
      </div>
      {/* <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-[100%] h-[30px]  text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
        
            name="email"
          />
      <div className='h-[25px]'>{error}</div> */}
        {/* {showError && <p>{error}</p>} */}

       
    </div>

    <button
              
      className="bg-white w-[100%] rounded-[10px] h-[40px] font-bold  text-[12px] "
    >
      Submit
    </button>

<div>
 
</div>



    </div>
  )
}

export default ResetForm