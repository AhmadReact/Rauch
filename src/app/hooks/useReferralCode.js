"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useReferralCode = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if referral_code exists in URL parameters
    const referralCode = searchParams.get("referral_code");

    if (referralCode) {
      // Store the referral code in localStorage
      localStorage.setItem("referral_code", referralCode);
    }
  }, [searchParams]);

  // Function to get referral code from localStorage
  const getReferralCode = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("referral_code");
    }
    return null;
  };

  // Function to clear referral code from localStorage
  const clearReferralCode = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("referral_code");
    }
  };

  return {
    getReferralCode,
    clearReferralCode,
  };
};

export default useReferralCode;
