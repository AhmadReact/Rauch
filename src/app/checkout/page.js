"use client";
import { useEffect, useState } from "react";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import PlanStepper from "./Components/Stepper";
import Congo from "./Components/cart/Congo";
import { useDispatch, useSelector } from "react-redux";
import { fetchHashing, orderGroup } from "../store/thunks/CartThunks";
import Footer from "../Components/Footer";
import HeaderNew from "../Components/HeaderNew";
import useOrderhash from "../hooks/useOrderhash";
import Header from "../Components/Header";
import CongoSurecel from "./Components/cart/CongoSurecel";
import { useRouter } from "next/navigation";

export default function Plan() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = (step) => {
    setCurrentStep(step);
  };

  const router = useRouter();

  const { cart_detail, order_num } = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    if (cart_detail?.order_completed) {
      return;
    }
    if (cart_detail?.order_groups?.length > 0) {
      if (cart_detail.order_groups.some((result) => result.plan == null))
        setCurrentStep(0);

      setCurrentStep(1);
    } else {
      router.push("/");
    }
    // else{
    //   setCurrentStep(0)
    // }
  }, [cart_detail]);

  useOrderhash();

  return (
    <>
      <Header />
      {/* <PlanStepper currentStep={currentStep} handleClick={handleClick}/> */}
      {currentStep === 0 && <Step2 handleClick={handleClick} />}
      <div className="mb-8  md:p-6 px-[calc(2vw)]  xl:px-[calc(5vw)]">
        {currentStep === 1 && <Step2 handleClick={handleClick} />}
        {currentStep === 2 && <CongoSurecel />}
      </div>
      <Footer one={3} two={4} three={5} />
    </>
  );
}
