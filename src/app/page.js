"use client";

import dynamic from "next/dynamic";

import React from "react";
import Home from "./landing/page";
import useReferralCode from "./hooks/useReferralCode";
// import Home from './Landing/page'

const Index = () => {
  // Initialize referral code handling
  useReferralCode();

  return (
    <>
      <Home />
    </>
  );
};

export default Index;
