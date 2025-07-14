"use client";
import React from 'react'
import bg from "../assets/login.png";
import ForgotForm from './Components/ForgotForm';

const Login = () => {
  return (
    <div      style={{ backgroundImage: `url(${bg.src})` }} className='flex justify-center items-center bg-gray-50  bg-cover w-[100vw] h-[100vh] overflow-hidden'>

    <ForgotForm/>

    </div>
  )
}

export default Login