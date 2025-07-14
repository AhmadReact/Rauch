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

const PlanNew = ({ sectionRef }) => {
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
  const { order_hash, cart_detail } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo } = useSelector((state) => {
    return state.user;
  });

  const router = useRouter();

  const checkOrderHash = () => {
    return new Promise((resolve, reject) => {
      if (order_hash) {
        if (cart_detail?.type == "upgrade_downgrade") {
          reject({ message: "upgrade_downgrade" });
        }

        resolve(order_hash);
      } else {
        dispatch(fetchHashing())
          .unwrap()
          .then((result) => {
            resolve(result.order_hash);
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error in getting order hash",
            });

            reject(true);
          });
      }
    });
  };
  const addToCartWrapper = (planid) => {
    setLoader(true);

    checkOrderHash()
      .then((result) => {
        let tmpObj = {
          plan_id: planid,
          order_hash: result,
          device_id: fixedDeviceSim.device_id,
          sim_id: fixedDeviceSim.sim_id,
        };

        if (cart_detail?.order_groups?.some((obj) => obj.plan.id == planid)) {
          tmpObj.device_id = cart_detail.order_groups.filter(
            (obj) => obj.plan.id == planid
          )[0].device.id;
        }

        if (userInfo?.hash) {
          tmpObj.customer_hash = userInfo.hash;
        }

        dispatch(addToCart(tmpObj))
          .unwrap()
          .then(() => {
            dispatch(orderGroup(result))
              .unwrap()
              .then(() => {
                // dispatch(addToCart({ device_id: 102, order_hash: order_hash }))
                //   .unwrap()
                //   .then(() => {
                //   });

                dispatch(getCartDetail(result))
                  .unwrap()
                  .then(() => {
                    setLoader(false);
                    router.push("/checkout");
                  });
              });
          });
      })
      .catch((error) => {
        setLoader(false);
        if (error?.message == "upgrade_downgrade") {
          Swal.fire({
            icon: "Error",
            title: "Upgrade downgrade scheduled",
            text: "Please checkout upgrade downgrade first.",
          });
        }
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
        className=" relative  py-[40px] md:py-[90px] px-8 md:px-[calc(10vw)]  font-avenir-medium bg-[#262626] text-white h-[502px] md:h-[780px] 2xl:h-[1000px]"
        id="section2"
        ref={sectionRef}
      >
        <div className="text-center md:px-[calc(10vw)]">
          {" "}
          <h2 className="text-mHeadingLarge font-bold md:text-dFontSize  font-avenir-black">
            Select Your Plan
          </h2>
          <p className=" text-mHeadingSmall md:text-[20px] font-bold font-avenir-medium">
            No contract. Cancel anytime
          </p>
        </div>

        <div className="flex flex-col gap-y-[57px] md:flex-row max-md:h-[100%] md:gap-x-[7%] justify-center max-md:justify-normal items-center mt-[40px] md:mt-[90px]  mb-[78px]">
          {/* first */}
          <div className="md:basis-1/2    flex max-md:flex-row max-md:gap-x-[9px] flex-col justify-center items-center  ">
            <div
              className=" flex justify-center items-center text-center text-[25px]  w-[220px] h-[110px] md:w-[calc(42vw)] md:h-[20vw]   cursor-pointer  bg-white  text-green-500"
              onClick={() => addToCartWrapper(fixedPlans.id_1)}
            >
              <div className="flex flex-col gap-y-[2vw] lg:gap-y-[2vw]  xl:gap-y-[3vw]">
                <h2 className="font-avenir-black max-md:text-[15px] font-bold md:text-[25px] xl:text-[35px]  md:leading-[40px] text-nowrap">
                  {plans?.filter((x) => x.id == fixedPlans.id_1)[0]?.name}
                </h2>
                <h1 className="leading-[36px] md:leading-[48px] relative top-[6px] md:top-[15px] xl:top-[32px]  md:text-[60px] xl:text-[80px]  font-avenir-black">
                  <span className="relative bottom-[11px]">$</span>
                  <span className="text-[55px] md:text-[90px]  lg:text-[120px] xl:text-[180px] font-avenir-black">
                    {
                      plans?.filter((x) => x.id == fixedPlans.id_1)[0]
                        ?.amount_recurring
                    }
                  </span>
                  /mo
                </h1>

                <h2 className="max-md:text-[11px] md:text-[25px] xl:text-[35px] text-nowrap">
                  Up to 3 days monthly
                </h2>
              </div>
            </div>
          </div>
          {/* second */}
          <div className="md:basis-1/2    flex max-md:flex-row max-md:gap-x-[9px] flex-col justify-center items-center  ">
            <div
              className=" flex justify-center items-center text-center text-[25px]  w-[220px] h-[110px] md:w-[calc(42vw)] md:h-[20vw]    cursor-pointer  bg-white  text-[#3E71B7]"
              onClick={() => addToCartWrapper(fixedPlans.id_2)}
            >
              <div className="flex flex-col gap-y-[2vw] lg:gap-y-[2vw]  xl:gap-y-[3vw]">
                <h2 className="font-avenir-black max-md:text-[15px] font-bold md:text-[25px] xl:text-[35px]  md:leading-[40px] text-nowrap">
                  {plans?.filter((x) => x.id == fixedPlans.id_2)[0]?.name}
                </h2>
                <h1 className="leading-[36px] md:leading-[48px] relative top-[6px] md:top-[15px] xl:top-[32px] md:text-[60px] xl:text-[80px] font-avenir-black">
                  <span className="relative bottom-[11px]">$</span>
                  <span className="text-[55px] md:text-[90px]  lg:text-[120px] xl:text-[180px] font-avenir-black">
                    {
                      plans?.filter((x) => x.id === fixedPlans.id_2)[0]
                        ?.amount_recurring
                    }
                  </span>
                  <span>/mo</span>
                </h1>

                <h2 className="text-[11px] md:text-[25px] xl:text-[35px] text-nowrap">
                  Unlimited days of backup daily
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-[107px] hidden md:block">
          {/* <button className="mt-[40px] mb-[40px] border-2 rounded-[30px] bg-white text-dfyellow p-2 px-5 w-40
            max-md:text-msButton max-md:py-[4px] max-md:px-[15px]
            " onClick={()=>router.push('/plans')}>
              Get Started
            </button> */}
        </div>

        <div className="mobiletriangle md:hidden"></div>
        <div className="triangle hidden md:block"></div>
      </div>
    </>
  );
};

export default PlanNew;
