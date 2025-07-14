import { useAddToCart } from "@/app/hooks/useAddToCart";
import React from "react";

const PlansCard = ({ plan }) => {
  const [addToCartWrapper, loader] = useAddToCart();
  return (
    <>
      {" "}
      {loader && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div
        className="min-h-[370px] min-w-[310px] bg-[#f5f7ff] border-[5px] border-[#405ebf] group hover:border-[#EE8B3F] relative flex flex-col items-center rounded-[10px] pb-[50px] px-[20px]"
        onClick={() => addToCartWrapper(plan)}
      >
        <button className="bg-[#405ebf] absolute top-[-5px] text-white px-[21px] py-[5px] rounded-[5px] group-hover:bg-[#EE8B3F]">
          {plan?.name}
        </button>
        <h2 className="text-3xl font-bold mt-[40px]">
          $ {plan?.amount_recurring}/month
        </h2>
        <div className="border border-[#86a1f8] w-[80%] mt-[30px]"></div>
        <div className="my-4">
          <h2 className="text-[23px] font-semibold">What's included</h2>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: plan.description,
          }}
          className="relative left-3"
        ></div>

        <div>
          <button className="absolute bottom-3 right-[50%] translate-x-[50%] text-[15px] px-[15px] py-[5px] text-nowrap bg-[rgb(21, 45, 121)] bg-[#152D79] text-white rounded-[34px]">
            CHOOSE THIS PLAN
          </button>
        </div>
      </div>
    </>
  );
};

export default PlansCard;
