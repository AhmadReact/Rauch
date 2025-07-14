import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Congo = () => {
  const { order_num, invoice_hash } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!userInfo.id) {
    return <div></div>;
  }
  return (
    <div className="p-2 px-1 md:px-10 md:m-5 flex flex-col items-center text-center">
      <div className="w-[90%] md:w-[50%]">
        <h2 className="text-[#36B5C0] text-[55px]">Success!</h2>
        <h2 className="md:my-3">Your order has been placed.</h2>
        <h2 className="md:my-3 mb-5 md:mb-10">
          You will receive a confirmation email soon.
        </h2>
        <h4 className="md:mt-4 mb-5 md:mb-10 ">
          Click{" "}
          <a
            className="font-bold text-blue-400"
            href={
              " " +
              process.env.NEXT_PUBLIC_ENV_VARIABLE +
              "/invoice/download/" +
              userInfo.company.id +
              "?order_hash=" +
              invoice_hash
            }
          >
            here
          </a>{" "}
          to download your invoice for order number {order_num}
        </h4>
        <p>Automatic Raunch® keeps your business connected.</p>
        <p className="my-3">
          When your NetLink device arrives, you'll find that connecting to the
          internet is a breeze. If you have any trouble at all, our 24/7 chat
          and phone support team is here to lend a hand whenever you need
          assistance.{" "}
        </p>

        <h2 className="my-3">
          Thank you for choosing us—we're excited to bring seamless connectivity
          into your life!
        </h2>

        <h2 className="my-3">
          Your NetLink® device will arrive in 3-5 business days.
        </h2>
      </div>
      <Button onClick={() => router.push("/")} variant="outlined">
        GO BACK
      </Button>
    </div>
  );
};

export default Congo;
