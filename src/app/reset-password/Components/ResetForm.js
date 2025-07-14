"use client";
import React, { useState } from 'react'
import logo from "../../assets/Group 17.png"
import Image from 'next/image'
import { resetPassword } from '@/app/services/services';
import Swal from 'sweetalert2';
import { updateLoaderState } from '@/app/store/slices/LoaderSlice';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';

const ResetForm = () => {
  const [formObj, setFormObj] = useState({password:"",confirmPassword:""});
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const searchParams = useSearchParams()
  const handleChange = (event) => {
    
   const {name,value} = event.target ;
   setFormObj({...formObj,[name]:value})

  };


  const formik = useFormik({

    initialValues:{

      password : "",
      confirmPassword:""
    },
    onSubmit:(values)=>{

      setError('');
      dispatch(updateLoaderState(true));
      resetPassword(searchParams.get("token"),values.password).then(
        (result)=>{
          if(result.status=="success"){

            dispatch(updateLoaderState(false));
            Swal.fire({
              icon: "success",
              title: "Password Updated",
              text: result.message,
            });
          
            router.push("/login")
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
          title: 'Error in Reset Password',
          text: error,
        })
  
      });


    },
    validate:(values)=>{

      const errors={};

      if (!values.password) {
        errors.password = "New password is required";
      }
      
      if(!values.confirmPassword){
        errors.confirmPassword="Confirm password is required"
      }
      else if(values.confirmPassword!=values.password)
      {
        errors.confirmPassword="Confirm password is not same"
      }

      return errors;



    }



  })

  const router = useRouter();
  const resetClick = () => {

    

    if(formObj.password!=formObj.confirmPassword){
      setError('Confirm password is not same');
    }else{
     
   
     
    }
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };




  return (
    
    <div className='bg-[#262626]  h-[400px]  max-sm:w-[90vw] w-[420px] pt-[40px] pb-[10px] px-[50px] flex flex-col justify-between'>

      <div className='flex justify-center'>
          <Image src={logo}  className="w-[100px] md:w-[120px]" alt="logo" />
      </div>

      <div className='flex flex-col items-center gap-y-[23px]'>
      <h2 className='text-[#F7FCFD] text-[20px]'>Reset Password</h2>
      <div className='w-[100%]'>
      <div className='w-[100%] mb-2'>
      <input
          type="password"
          placeholder="New Password"
          className="w-[100%] h-[30px] text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
        />
      <div className='h-[25px] text-red-400 text-[12px] pt-[5px]'>{formik?.errors?.password}</div>
      </div>
        <div className='w-[100%]'>
        <input 
        
        
        onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="w-[100%] h-[30px] text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
        
          name="confirmPassword"
        />
        <div className='h-[25px] text-red-400 text-[12px] pt-[5px]'>{formik?.errors?.confirmPassword}</div>
      </div>
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
      onClick={formik.handleSubmit}      
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