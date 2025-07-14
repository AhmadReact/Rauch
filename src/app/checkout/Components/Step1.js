import PlanNew from '@/app/Components/PlanNew';

import PlanTableme from '@/app/Components/PlanTableme';
import { fixedDeviceSim, fixedPlans } from '@/app/helperData/constants';
import { useFetchPlansQuery } from '@/app/store/apis/API';
import { addToCart, getCartDetail, orderGroup } from '@/app/store/thunks/CartThunks';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Step1 = () => {

    const features = [
        "Multiple cell carriers",
        "NetScan technology for best service",
        "Automatic switch to backup cell service",
        "NetLink Command cloud management portal",
        "24/7 call and chat support",
        "Engineers on staff",
        "Easy power-on setup",
      ];
    
      const featuers2 = [
        "Multiple cell carriers",
    "NetScan technology for best service",
    "Automatic switch to backup cell service",
    "NetLink Command cloud management portal",
    "24/7 call and chat support",
    "Engineers on staff",
    "Easy power-on setup",
    "Static IP",
    
      ]

      const { data: plans, error: errorplan, isFetching } = useFetchPlansQuery();
      const [loader, setLoader] = useState(false);
      const dispatch = useDispatch();
      const { userInfo } = useSelector((state) => {
        return state.user;
      });

      const { order_hash } = useSelector((state) => {
        return state.cart;
      });
      

      const addToCartWrapper = (planid) => {
        setLoader(true);
    
        let tmpObj = {
          plan_id: planid, 
          order_hash: order_hash,
          device_id:fixedDeviceSim.device_id,
          sim_id:fixedDeviceSim.sim_id,
        }
    
          if(userInfo?.hash)
        {
    
          tmpObj.customer_hash=userInfo.hash
        }
    
        dispatch(addToCart(tmpObj))
          .unwrap()
          .then(() => {
            setLoader(false);
            dispatch(orderGroup(order_hash))
              .unwrap()
              .then(() => {
                Swal.fire({
                  title: "Plan added!",
                  text: "Plan added to your cart!",
                  icon: "success"
                });
                dispatch(getCartDetail(order_hash));
              });
          });
      };
    



  return (
    <div className='md:mt-8'>
 {loader &&
    <div className="overlay">
    <div className="loaderImage-container">
    <span className="loader"></span>
    </div>
  </div>
  
    }
{/* <h2 className="text-mFontSize md:text-dFontSize max-md:font-bold  text-center mt-4 md:mt-8">
          Select Your Plan
        </h2>

    <div className="flex flex-col md:flex-row justify-center items-center mt-[35px] mb-[60px]">
      
        <div className="md:basis-1/2  flex flex-col justify-center items-center cursor-pointer " >
          <div className="bg-orange-500 font-avenir-medium text-center text-[25px] rounded-[100px] px-[50px] p-[15px]  text-white" onClick={() =>
              addToCartWrapper(fixedPlans.id_1)
            }>
            <h2 className="leading-[40px]"> {plans?.filter((x) => x.id == fixedPlans.id_1)[0].name}</h2>
            <h1 className=" leading-[48px]">
              $<span className="text-[55px]"> {plans?.filter((x) => x.id == fixedPlans.id_1)[0].amount_recurring}</span> /mo
            </h1>

            <h2 className="text-[13px]">Up to 3 days monthly</h2>
          </div>
          <div className="mt-[25px]">
            {features.map((feature,i) => {
              return (
                <div className="flex items-center justify-center gap-x-4" key={i}>
                 
                  <h2>{feature}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 md:p-0 h-[2px] w-[250px] md:w-[2px] md:h-[305px] md:bg-slate-200  relative top-6"></div>
        <div className="md:basis-1/2  flex flex-col justify-center items-center px-5 cursor-pointer"  >
          <div className="bg-blue-500 font-avenir-medium text-center text-[25px] rounded-[100px] px-[50px] p-[15px]   text-white" onClick={() =>
              addToCartWrapper(fixedPlans.id_2)
            }>
            <h2 className="leading-[40px]">{plans?.filter((x) => x.id == fixedPlans.id_2)[0].name}</h2>
            <h1 className="leading-[48px]">
              $<span className="text-[55px]">    {plans?.filter((x) => x.id == fixedPlans.id_2)[0].amount_recurring}</span> /mo
            </h1>

            <p className="text-[13px]">Unlimited days of backup daily</p>
          </div>
          <div className="mt-[25px]">
            {featuers2
              .map((feature,i) => {
                return (
                  <div className="flex items-center justify-center gap-x-4" key={i}>
                   
                    <h2>{feature}</h2>
                  </div>
                );
              })}
          </div>
        </div>
      </div> */}

      <PlanNew />
      <PlanTableme hide={true}/>
    </div>
  )
}

export default Step1