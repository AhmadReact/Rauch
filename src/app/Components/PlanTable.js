import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useFetchPlansQuery } from "../store/apis/API";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchHashing,
  getCartDetail,
  orderGroup,
} from "../store/thunks/CartThunks";
import { FaRegCircle } from "react-icons/fa";

import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { fixedDeviceSim, fixedPlans } from "../helperData/constants";


// Default values shown

// Default values shown

const PlanTable = ({ sectionRef }) => {
  const features = [
    "Multiple cell carriers",
    "NetScan technology for best service",
    "Automatic switch when service goes down",
    "NetLink Command cloud management portal",
    "24/7 call and chat support",
    
    "Easy power-on setup",
    "Static IP",
    "Up to 3 days monthly" ,
    "Unlimited cellular internet"
  ];



  const { data: plans, error: errorplan, isFetching } = useFetchPlansQuery();

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { order_hash } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo } = useSelector((state) => {
    return state.user;
  });


  const router = useRouter();
  const addToCartWrapper = (planid) => {
    setLoader(true);

    let tmpObj = {
      plan_id: planid,
      order_hash: order_hash,
      device_id:fixedDeviceSim.device_id,
      sim_id:fixedDeviceSim.sim_id,

    };

    if (userInfo?.hash) {
      tmpObj.customer_hash = userInfo.hash;
    }

    dispatch(addToCart(tmpObj))
      .unwrap()
      .then(() => {

      

  dispatch(orderGroup(order_hash))
              .unwrap()
              .then(() => {
      
        // dispatch(addToCart({ device_id: 102, order_hash: order_hash }))
        //   .unwrap()
        //   .then(() => {
        //   });
            setLoader(false);
          

                dispatch(getCartDetail(order_hash));
             
              router.push('/plans')

             
       
     });
    })
  };

  return (
    <>
      {(loader || isFetching) && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div className="p-6 !pb-9 md:p-8 font-avenir-medium" id="section2" ref={sectionRef}>
        {/* <div className="text-center md:px-[calc(10vw)]">
          {" "}
          <h2 className="text-mHeadingLarge  md:text-dFontSize md:font-bold font-avenir-medium">
            Select Your Plan
          </h2>
          <p className=" text-mHeadingSmall md:text-[20px] md:font-bold font-avenir-medium">No contract. Cancel anytime</p>
        </div> */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-[35px]">
        
     
          <div
            className="md:basis-1/2  flex max-md:flex-row max-md:gap-x-[9px] flex-col justify-center items-center cursor-pointe"
            onClick={() =>
              addToCartWrapper(fixedPlans.id_2)
            }
          >
       
            <div className="md:mt-[25px] max-md:basis-1/2">
        



<div className="grid grid-cols-4 gap-3">
    <div className="col-span-3">

     <div className="bg-green-500 text-white">
    <div className="font-avenir-medium text-center  ">
      <h2 className="text-xs md:text-sm md:leading-[40px]">
        {plans?.filter((x) => x.id == fixedPlans.id_1)[0].name}
      </h2>
      <h1 className="leading-[36px] md:leading-[18px] relative top-[4px]">
        $<span className="text-[8px] md:text-[40px] md:font-normal">
          {plans?.filter((x) => x.id == fixedPlans.id_1)[0].amount_recurring}
        </span>/mo
      </h1>
    </div>
  </div>
    </div>
 
  <div className="bg-[#35B6BF] text-white">
    <div className="font-avenir-medium text-center py-4 px-4 md:px-2 md:py-1">
      <h2 className="text-xs md:text-sm md:leading-[40px]">
        {plans?.filter((x) => x.id == fixedPlans.id_2)[0].name}
      </h2>
      <h1 className="leading-[36px] md:leading-[18px] relative top-[4px]">
        $<span className="text-[8px] md:text-[40px] md:font-normal">
          {plans?.filter((x) => x.id === fixedPlans.id_2)[0].amount_recurring}
        </span>/mo
      </h1>
    </div>
  </div>
  {features.map((feature, i) => (
    <React.Fragment key={i}>
      <div className=" text-xl bg-[#F0F0F0] col-span-2">

        <h2 className="text-lg  ">{feature}</h2>
      </div>
      <div className="bg-green-100 justify-center text-2xl">
        {i !== 6 && i !== 8 && (
          <div className="flex justify-center">
            <FaRegCircle className="bg-white text-green-700 hidden md:block" style={{ marginBottom: '10px' }} />
          </div>
        )}
      </div>
      <div className="bg-[#26BCC6] justify-center text-2xl">
        {i !== 7 && (
          <div className="flex justify-center">
            <FaRegCircle className="text-blue-600 hidden md:block md:mb-1" />
          </div>
        )}
      </div>
    </React.Fragment>
  ))}
</div>








<div className="text-center">
        <button className="mt-[40px] mb-[40px] border-2 rounded-[30px] bg-[#3F6FB6] h-[76px] text-white p-2 px-5 w-40
            max-md:text-msButton max-md:py-[4px] max-md:px-[15px]
            " onClick={()=>router.push('/plans')}>
              Select Plans
            </button>
           </div>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanTable;
