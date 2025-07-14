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

import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { fixedDeviceSim, fixedPlans } from "../helperData/constants";


// Default values shown

// Default values shown

const Plan = ({ sectionRef }) => {
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
      <div className="md:hidden p-6 !pb-9 md:p-8 font-avenir-medium" id="section2" ref={sectionRef}>
        <div className="text-center md:px-[calc(10vw)]">
          {" "}
          <h2 className="text-mHeadingLarge  md:text-dFontSize md:font-bold font-avenir-medium">
            Select Your Plan
          </h2>
          <p className=" text-mHeadingSmall md:text-[20px] md:font-bold font-avenir-medium">No contract. Cancel anytime</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-[35px]">
          <div
            className="md:basis-1/2  flex max-md:flex-row max-md:gap-x-[9px] flex-col justify-center items-center cursor-pointer "
            onClick={() =>
              addToCartWrapper(fixedPlans.id_1)
            }
          >
            <div className="bg-orange-500 font-avenir-medium text-center text-[25px] rounded-[13px] md:rounded-[100px] py-[9.7px] px-[31px] md:px-[50px] md:p-[15px]  text-white">
              <h2 className="max-md:text-[9px] md:leading-[40px]">
                {plans?.filter((x) => x.id == fixedPlans.id_1)[0].name}
              </h2>
              <h1 className="leading-[36px] md:leading-[48px] relative top-[4px]">
                $
                <span className="text-[38px] md:text-[55px]">
                  {plans?.filter((x) => x.id == fixedPlans.id_1)[0].amount_recurring}
                </span>
                /mo
              </h1>

              <h2 className="max-md:text-[9px] text-[13px]">Up to 3 days monthly</h2>
            </div>
            <div className="md:mt-[25px]">
              {features.map((feature, i) => {
                return (
                  <div className="border-both md:border-none flex max-md:justify-center items-center gap-x-4 max-md:mb-[4.7px] max-md:bg-[#E6E6E6]" key={i}>
                    <GiCheckMark className="bg-orange-500 hidden md:block" />
                    <h2 className="max-md:text-[8px]">{feature}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-5 md:p-0 h-[2px] w-[250px] md:w-[2px] md:h-[315px] md:bg-slate-200  relative top-6"></div>
          <div
            className="md:basis-1/2  flex max-md:flex-row max-md:gap-x-[9px] flex-col justify-center items-center cursor-pointe"
            onClick={() =>
              addToCartWrapper(fixedPlans.id_2)
            }
          >
            <div className="  max-md:basis-1/2 font-avenir-medium text-center text-[25px] rounded-[13px] md:rounded-[100px] py-[9.7px] px-[20px]  md:px-[50px] md:p-[15px]  text-white bg-blue-500">
              <h2 className="max-md:text-[9px] md:leading-[40px]">
                {plans?.filter((x) => x.id==fixedPlans.id_2)[0].name}
              </h2>
              <h1 className="leading-[36px] md:leading-[48px] max-md:relative max-md:top-[3px]">
                $
                <span className="text-[38px] md:text-[55px]">
                  {plans?.filter((x) => x.id===fixedPlans.id_2)[0].amount_recurring}
                </span>
                /mo
              </h1>

              <p className="max-md:text-[9px] text-[13px]">Unlimited days of backup daily</p>
            </div>
            <div className="md:mt-[25px] max-md:basis-1/2">
              {featuers2.map((feature, i) => {
                return (
                  <div className="border-both-blue md:border-none flex text-center max-md:justify-center items-center gap-x-4 max-md:mb-[4.7px] max-md:bg-[#E6E6E6]" key={i}>
                    <GiCheckMark className="bg-[#3E70B7] hidden md:block" />
                    <h2 className="max-md:text-[8px]">{feature}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
