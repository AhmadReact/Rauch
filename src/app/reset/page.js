"use client";
import React from 'react'
import bg from "../assets/login.png";
import ResetForm from './Components/ResetForm';

const Login = () => {
  return (
    <div      style={{ backgroundImage: `url(${bg.src})` }} className='flex justify-center items-center bg-gray-50  bg-contain w-[100vw] h-[100vh] overflow-hidden'>

    <ResetForm/>

    </div>
  )
}

export default Login