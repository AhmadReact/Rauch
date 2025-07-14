"use client";
import React from "react";
import goverment from "../assets/Government.png";
import education from "../assets/Group 246.png";
import it from "../assets/Group 248.png";
import retail from "../assets/Group 250.png";
import health from "../assets/Group 252.png";
import rural from "../assets/Group 254.png";
import call from "../assets/Group 256.png";
import hotel from "../assets/Group 258.png";

import Image from "next/image";
import { useRouter } from "next/navigation";
const DontLoseBusiness = () => {
  const router = useRouter();
  return (
    <div className="bg-[#5DAC32] text-white py-[30px] md:py-[60px] px-8 md:px-[calc(5vw)]">
      <div className="md:leading-none">
        <h2 className="text-mHeadingMedium md:text-dFontSize text-center">
          Don’t lose business.
        </h2>
        <h2 className="text-mHeadingLarge md:text-dFontSize font-bold text-center leading-none">
          Don’t let your employees sit around.
        </h2>
      </div>

      <div className="text-center mt-[20px] md:mt-[50px]">
        <p className=" max-md:text-mSParaGraph  ">
          We know how damaging internet outages can be for a business. It’s not
          just inconvenient. When you can’t process transactions, when your
          operations are jeopardized, and your team is sitting around waiting
          for the internet to be restored…that’s real money down the drain.
          Forbes estimates the cost of unplanned downtime to be around $5,600
          per minute!
        </p>

        <p className=" max-md:text-mSParaGraph   mt-[20px]">
          Insure your business with our automatic backup internet solution.
        </p>
      </div>
      <div className=" flex flex-wrap max-md:gap-y-4  justify-between mt-[30px] md:mt-[70px]">
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image
            className="w-[30px] md:w-[70px]"
            src={goverment}
            alt="government"
          />
          <h2 className="text-center max-md:text-[9.5px]">Government</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image
            className="w-[30px] md:w-[70px]"
            src={education}
            alt="education"
          />
          <h2 className="text-center  max-md:text-[9.5px]">Education</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={it} alt="it" />
          <h2 className="text-center  max-md:text-[9.5px]">IT Services</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={retail} alt="retail" />
          <h2 className="text-center  max-md:text-[9.5px]">Retail Outlets</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={health} alt="health" />
          <h2 className="text-center  max-md:text-[9.5px]">Healthcare</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={rural} alt="rural" />
          <h2 className="text-center  max-md:text-[9.5px]">Rural Homes</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={call} alt="call" />
          <h2 className="text-center  max-md:text-[9.5px]">Call Centers</h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between items-center max-md:w-1/4">
          <Image className="w-[30px] md:w-[70px]" src={hotel} alt="hotel" />
          <h2 className="text-center  max-md:text-[9.5px]">Restaurants</h2>
        </div>
      </div>
      <div className="flex flex-col items-center mt-[30px] md:mt-14">
        <p className="mb-3 max-md:text-[9.5px]">
          Your reputation is on the line.
        </p>
        <button
          className="border-2 rounded-[30px] text-[#5DAC32] font-bold border-white bg-white   md:w-[160px] md:h-[43px]
       
       max-md:text-msButton max-md:h-[26px] max-md:px-[15px]
       "
          onClick={() => router.push("/plans")}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default DontLoseBusiness;
