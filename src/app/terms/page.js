"use client";
import React, { useRef } from "react";
import Header from "../Components/Header";
import FullEmergencyResponseAgreement from "./Components/Terms";

const Terms = () => {
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  const scrollToTarget = () => {
    // Scroll to the target element
    const targetOffset = targetRef.current.offsetTop;
    targetRef.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetOffset - 200,
      behavior: "smooth",
    });
  };

  const scrollToTarget2 = () => {
    // Scroll to the target element
    const targetOffset = targetRef2.current.offsetTop;
    targetRef2.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetOffset - 200,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header />

      <FullEmergencyResponseAgreement />
    </>
  );
};

export default Terms;
