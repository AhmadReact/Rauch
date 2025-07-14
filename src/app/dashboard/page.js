"use client";
import React, { useEffect } from 'react'
import BillingData from "./Components/BillingData"
import AccountDetail from './Components/AccountDetail'
import PrivateRoute from '../routes/PrivateRoute'
import HeaderNew from '../Components/HeaderNew'
import { useSelector } from 'react-redux';
import { useFetchOrdersQuery } from '../store/apis/API';
import Header from '../Components/Header';

const Dashboard = () => {
  const {userInfo}= useSelector((state)=>{

    return state.user
  })
  const {data,isFetching} = useFetchOrdersQuery({id:userInfo.id,hash:userInfo.hash});


  return (
    <>
    <PrivateRoute>
    <Header/>
        <div className='flex flex-col md:flex-row md:mx-[110px]'>
            <div className='basis-full md:basis-1/3 md:p-10'>
                <BillingData></BillingData>
            </div>
            <div className='basis-full p-10 '>
                <AccountDetail></AccountDetail>
            </div>
        </div>
        </PrivateRoute>
    </>
  )
}

export default Dashboard