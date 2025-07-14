import React, { useState } from "react";
import couponImg from "../../../assets/coupon.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoupon,
  getCartDetail,
  getCartDetailUpgrate,
} from "@/app/store/thunks/CartThunks";
import Swal from "sweetalert2";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";

const CouponSection = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => {
    return state;
  });

  const [code, setCode] = useState("");
  const addCouponWrapper = () => {
    let coupon = {
      code: code,
      // customer_id: user.userInfo.id,
      // data_for_plans: false,
      // for_plans: false,
      hash: user.userInfo.hash,
      // only_detail: false,
      order_id: cart.cart_detail.id,
    };
    dispatch(updateLoaderState(true));
    dispatch(addCoupon(coupon))
      .unwrap()
      .then((result) => {
        setCode("");
        if (result.error) {
          dispatch(updateLoaderState(false));
          Swal.fire({
            icon: "error",
            title: result.error,
          });
        } else {
          dispatch(
            cart?.cart_detail?.type == "upgrade_downgrade"
              ? getCartDetailUpgrate(cart.order_hash)
              : getCartDetail(cart.order_hash)
          ).then(() => {
            dispatch(updateLoaderState(false));
            Swal.fire({
              icon: "success",
              title: "Coupon has been added",
            });
          });
        }
      });
  };

  return (
    <>
      <div className=" mt-8">
        <p className="text-[16px] md:text-[26.82px] font-[600] text-dfblue">
          COUPON CODE
        </p>
        <p className="text-[16px] md:text-[26.82px] text-[#858585] italic">
          Have a coupon?
        </p>

        <div>
          <div className="relative mt-2 rounded-md ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#27.66px]">
              <span className="text-gray-500 sm:text-sm">
                <Image
                  src={couponImg}
                  className="max-md:w-[40px]"
                  alt="coupons"
                />
              </span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ outline: "none" }}
              className=" outline-none border-none focus:outline-none block font-[600] text-[18px] md:text-[37.66px] rounded-md pl-[60px] md:pl-[75px] py-3.5 md:pr-20  placeholder:text-gray-400  focus:ring-insetsm:text-sm sm:leading-6"
              placeholder="ENTER YOUR CODE"
            />
          </div>
          <div className="bg-dfblue mt-2 h-[1px] w-[60vw] md:w-[459.39px] relative bottom-2"></div>
        </div>
      </div>
      <div className="flex justify-center">
        {" "}
        <button
          // disabled={!agreement}
          className={`rounded-[30px] mt-[20px] flex items-center font-bold text-white bg-dfblue
                  }  p-2 px-5`}
          onClick={addCouponWrapper}
          type="submit"
        >
          Add Coupon
        </button>
      </div>
    </>
  );
};

export default CouponSection;
