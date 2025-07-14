
import React, { Suspense } from 'react'
import bg from "../assets/login.png";
import ResetForm from './Components/ResetForm';

function SearchBarFallback() {
  return <></>
}


const Login = () => {
  return (
    <div      style={{ backgroundImage: `url(${bg.src})` }} className='flex justify-center items-center bg-gray-50  bg-cover w-[100vw] h-[100vh] overflow-hidden'>
      <Suspense fallback={<SearchBarFallback />}>
    <ResetForm/>
    </Suspense>
    </div>
  )
}

export default Login