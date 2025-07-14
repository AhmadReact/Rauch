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

const PlanTableme = ({ sectionRef,hide }) => {
  const features = [
    "Multiple cell carriers",
    "NetScan technology for best service",
    "Automatic switch when service goes down",
    "NetLink Command cloud management portal",
    "24/7 call and chat support",

    "Easy power-on setup",
   
    "Up to 3 days of internet",
    "Unlimited days of internet",
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
      device_id: fixedDeviceSim.device_id,
      sim_id: fixedDeviceSim.sim_id,
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

            router.push("/plans");
          });
      });
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
      <div
        className=" p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)] font-avenir-medium"
        id="section2"
        ref={sectionRef}
      >
        {/* <div className="text-center md:px-[calc(10vw)]">
          {" "}
          <h2 className="text-mHeadingLarge  md:text-dFontSize md:font-bold font-avenir-medium">
            Select Your Plan
          </h2>
          <p className=" text-mHeadingSmall md:text-[20px] md:font-bold font-avenir-medium">No contract. Cancel anytime</p>
        </div> */}
        <div className="flex flex-col md:flex-row md:justify-center items-center mt-[35px]">
          <div
            className=" flex max-md:gap-x-[9px] flex-col justify-center md:items-center  w-[100%]"
            // onClick={() => addToCartWrapper(fixedPlans.id_2)}
          >
            {/* <div className="grid grid-cols-4 gap-3">
    <div className="col-span-2">

    
    </div>
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
</div> */}

            <div className="flex xl:w-[100%] basis-[100%] gap-x-[10px]">
              <div className="flex-1 flex justify-end w-[247px] md:w-[60vw]">
                <div className="w-[49px] max-md:h-[25px] md:w-[135px] bg-green-500 md:pb-[17px]">
                  <div className=" text-white">
                    <div className="font-avenir-medium text-center max-md:flex max-md:flex-col max-md:mt-1  ">
                      <h2 className="text-[5px] md:text-xs md:leading-[40px]">
                        {plans?.filter((x) => x.id == fixedPlans.id_1)[0].name}
                      </h2>
                      <h1 className="leading-[0px] text-[10px] md:text-[15px] font-bold  md:leading-[18px] relative top-[4px]">
                        $
                        <span className="text-[10px] md:text-[40px] ">
                          {
                            plans?.filter((x) => x.id == fixedPlans.id_1)[0]
                              .amount_recurring
                          }
                        </span>
                        /mo

                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[49px] max-md:h-[25px] md:w-[135px]  bg-[#35B6BF] pb-[12px]">
                <div className=" text-white">
                  <div className="font-avenir-medium  text-center max-md:flex max-md:flex-col max-md:mt-1 ">
                    <h2 className="text-[5px] md:text-xs md:leading-[40px]">
                      {plans?.filter((x) => x.id == fixedPlans.id_2)[0].name}
                    </h2>
                    <h1 className="leading-[0px] text-[10px] md:text-[15px] md:leading-[18px] font-bold relative top-[4px]">
                      $
                      <span className="text-[10px] md:text-[40px] ">
                        {
                          plans?.filter((x) => x.id === fixedPlans.id_2)[0]
                            .amount_recurring
                        }
                      </span>
                      /mo
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {features.map((feature, i) => {
              return (
                <React.Fragment key={i}>
                        <div className="flex xl:w-[100%] basis-[100%] gap-x-[10px] mb-[10px]">
                            <div className="flex-1 flex items-center justify-between w-[247px] max-md:h-[18px] md:w-[60vw] bg-[#F0F0F0]">


                           
                        <h2 className="text-[8px] font-bold md:text-lg pl-[8px] md:pl-[15px]">{feature}</h2>
                        
                  <div className="bg-green-200 w-[49px] max-md:h-[18px]   md:min-w-[135px] h-[50px] text-white flex justify-center items-center">
                  <div className="w-[8px] md:w-[20px]">
                { i==7 || i==8 ? <></> :
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 40.659 40.659">
                <circle id="Ellipse_14" data-name="Ellipse 14" cx="20.329" cy="20.329" r="20.329" fill="#5dad32"/>
                <circle id="Ellipse_15" data-name="Ellipse 15" cx="12.591" cy="12.591" r="12.591" transform="translate(7.738 7.738)" fill="#fff"/>
              </svg>
                } 
 

</div>


                  </div>
                </div>
                 
                <div className="w-[49px] max-md:h-[18px]   md:min-w-[135px] h-[50px] bg-[#35b6bf8a] text-white flex justify-center items-center">
               <div className="w-[8px] md:w-[20px]">
                {i==6 ? <></> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 40.659 40.659">
                  <circle id="Ellipse_26" data-name="Ellipse 26" cx="20.329" cy="20.329" r="20.329" fill="#35b6bf"/>
                  <circle id="Ellipse_27" data-name="Ellipse 27" cx="12.591" cy="12.591" r="12.591" transform="translate(7.738 7.738)" fill="#fff"/>
                </svg>
                }</div>

                        </div>
                 
                  </div>
                </React.Fragment>
              );
            })}

        
{!hide &&
  <div className="text-center">
              <button
                className="mt-[40px] mb-[40px] border-2 rounded-[30px] bg-[#333333] text-[#F6921E] md:w-[160px] md:h-[43px]  
            max-md:text-msButton w-[99px] h-[27px] border-none
            "
            onClick={()=>router.push('/plans')}
              >
                Get Started
              </button>
            </div>

}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanTableme;
