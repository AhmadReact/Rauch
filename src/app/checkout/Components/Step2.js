import React from "react";
import Cart from "./cart/Cart";
import Delivery from "./cart/Delivery";
import ShipBill from "./cart/ShipBill";
import Congo from "./cart/Congo";
import { useSelector } from "react-redux";

const Step2 = ({ handleClick }) => {
  const { cart_detail } = useSelector((state) => {
    return state.cart;
  });

  if (!cart_detail) {
    return <div></div>;
  }

  return (
    <div>
      <h2 className="text-mFontSize md:text-dFontSize font-bold text-center">
        Checkout Form
      </h2>
      <p className="text-center md:font-semibold">
        You are almost done! fill the following information and select/add your
        card for payment.
      </p>

      <div className="px-2 py-10 md:px-10 md:m-5 border-[#868686] border max-md:mt-5">
        <div>
          <Cart handleClick={handleClick} />
        </div>
        {/* {  !(cart_detail?.type) && !cart_detail?.express_shipment && (
          <>
            <div className="my-3">
              <h2>Need internet urgently?</h2>
              <p className="text-[#F77E0F]">
                Emergency Overnight Delivery: Order by 5pm ET, receive your device by 10am local time
              </p>
            </div>


            <div>
              <Delivery />
            </div>
          </>
        )}

        <ShipBill handleClick={handleClick} /> */}

        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
