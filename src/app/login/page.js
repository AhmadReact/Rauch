"use client";
import React, { useEffect } from 'react'
import bg from "../assets/login.png";
import LoginForm from './Components/LoginForm';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateLoaderState } from '../store/slices/LoaderSlice';
import { customerInvoices, getCustomerDetail, getCustomerOrder, getUserBillingCards } from '../store/thunks/UserThunks';
import { autoLogin } from '../services/services';
import Swal from 'sweetalert2';

const Login = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const {user} = useSelector((state)=>{
    return state;
})


  // useEffect(() => {
  //   // Your authentication logic goes here
  //   // For example, you might check if the user is logged in
   

  //   if (user.isSignedIn) {
  //     // Redirect to the login page if not authenticated
  //     router.push('/dashboard');
  //   }
  // }, [user]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("hash")) {

      dispatch(updateLoaderState(true))
      autoLogin(searchParams.get("hash")).then((result) => {
     
        if(result.id)
          {
            dispatch(updateLoaderState(false))
            dispatch(getCustomerOrder(result.id))
            .unwrap()
            .then((result) => {
              // if (!result.order_hash) {
              //   dispatch(fetchHashing());
              // }
            });

          dispatch(getCustomerDetail(result.hash));
          dispatch(getUserBillingCards(result.id));
          dispatch(customerInvoices(result))
            .unwrap()
            .then(() => {
              // setIsLoading(false);
              router.push("/dashboard");
            });


          }
          else{
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: result.details,
            });


          }
          dispatch(updateLoaderState(false))

      }).catch(()=>{

        console.log("error")
        dispatch(updateLoaderState(false))
        Swal.fire({
          icon: "error",
          title: "Api Error",
          
        });
      });
    }
    else if(user.isSignedIn)
      {
        router.push('/dashboard');
      }
  }, []);


  if(user.isSignedIn)
  {
    return <></>
  }



  return (
  
    <div      style={{ backgroundImage: `url(${bg.src})` }} className='flex justify-center items-center bg-gray-50  bg-cover w-[100vw] h-[100vh] overflow-hidden'>
    <LoginForm/>
    </div>
   
  )
}

export default Login