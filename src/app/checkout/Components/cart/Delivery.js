import React, { useEffect, useState } from "react";
import icon1 from "../../../assets/Group 74.png";
import icon2 from "../../../assets/Group 71.png";
import icon3 from "../../../assets/Group 102.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCartDetail,
  orderGroup,
} from "@/app/store/thunks/CartThunks";
import Swal from "sweetalert2";
import { getCustomerTax } from "@/app/store/thunks/UserThunks";
import { updateCart } from "@/app/store/slices/CartSlice";
import { useGetExpressQuery } from "@/app/store/apis/API";
import {
  Mycircle,
  Mycirclefilled,
  express_shipment_id,
} from "@/app/helperData/constants";

const Delivery = ({ removeExpress }) => {
  const [loader, setLoader] = useState(false);

  const { order_hash, cart_detail } = useSelector((state) => {
    return state.cart;
  });
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const handleShipment = () => {
    if (cart_detail?.express_shipment) {
      removeExpress();
    } else {
      setLoader(true);

      let tmpObj = {
        order_hash: order_hash,
        device_id: fetchDevice.id,
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
              dispatch(getCartDetail(order_hash))
                .unwrap()
                .then((result) => {
                  setLoader(false);
                  Swal.fire({
                    title: "Overnight delivery added!",
                    text: "Overnight delivery added to your cart.",
                    icon: "success",
                  });

                  //  if(result?.express_shipment)
                  //  {

                  //      dispatch(getCustomerTax(userInfo.billing_state_id)).unwrap().then((tax)=>{

                  //           let calculatedtax =0;
                  //              if(result?.express_shipment.device.taxable)
                  //              {
                  //                calculatedtax =   result?.express_shipment.device.amount * (tax.tax_rate/100);

                  //              }

                  //             console.log(calculatedtax)
                  //             //   let updateExpressShipment =  result;
                  //             //  updateExpressShipment.calculatedtax=updateExpressShipment.taxes+calculatedtax;
                  //              let updatedExpressShipment={...result,express_shipment:{...result.express_shipment,tax:calculatedtax}}

                  //              dispatch(updateCart({name:"cart_detail",value:updatedExpressShipment}))
                  //      })

                  //  }
                });
            });
        });
    }
  };

  const { data: fetchDevice } = useGetExpressQuery(express_shipment_id);

  return (
    <>
      {loader && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div className="bg-white border-[#868686] border max-md:my-5">
        <div className="grid grid-cols-5 md:grid-cols-5 items-center gap-1 md:gap-4 p-3 md:p-5">
          <div className="flex gap-x-10">
            <div className="cursor-pointer" onClick={handleShipment}>
              {!cart_detail?.type && !cart_detail?.express_shipment ? (
                <>
                  <Mycircle />
                </>
              ) : (
                <>
                  <Mycirclefilled />
                </>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-3  max-md:text-[14px] text-black flex items-center ">
            <h2 className="font-bold ">Emergency Overnight Delivery</h2>
          </div>
          {/* <div className='flex justify-center'>
            <div className="grid max-md:grid-rows-3 md:grid-cols-3 h-[120px] w-[40px]  md:w-[120px] md:h-[40px] border-[#868686] border ">
              <div className="cursor-pointer bg-[#F0F0F0] border-[#868686] text-[#868686] border-r font-bold flex justify-center items-center ">
                -
              </div>
              <div className="flex justify-center text-[#868686]  items-center ">
                1
              </div>
              <div className="cursor-pointer bg-[#F0F0F0] border-[#868686] text-[#868686]  border-l font-bold flex justify-center items-center">
                +
              </div>
            </div>
          </div> */}
          <div className="max-md:col-span-2 max-md:mx-auto">
            <h2 className="font-bold">${fetchDevice?.amount}</h2>
            <h2 className="text-[#868686] max-md:text-[13px] italic">
              One time
            </h2>
          </div>
          {/* <div className='max-md:col-span-2 max-md:mx-auto'>
            <button onClick={handleShipment} className=" md:rounded-[30px] flex items-center font-bold max-md:text-[10px] text-white bg-[#F77E0F] p-2 px-5 ">Add to cart</button>

            </div> */}
        </div>
      </div>
    </>
  );
};

export default Delivery;
