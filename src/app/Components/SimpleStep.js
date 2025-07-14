"use client";
import React from "react";
import Image from "next/image";
import icon1 from "../assets/Group 147.png";
import icon2 from "../assets/Group 152.png";
import icon3 from "../assets/device.png";
import { useRouter } from "next/navigation";

const SimpleStep = () => {
  const router = useRouter();
  return (
    <div className="bg-[#3E70B7] py-[30px] md:py-[60px] px-8 md:px-[calc(5vw)] xl:md:px-[calc(10vw)]">
      <div>
        <h2 className="text-mHeadingLarge md:text-dFontSize text-white font-bold text-center">
          Simple 3-Step Setup
        </h2>
      </div>

      <div className="flex justify-center flex-wrap gap-5 mt-5 md:mt-10">
        <div className="bg-white text-center w-[250px] md:w-[380px] p-6 md:p-10 flex flex-col items-center rounded-[11px] md:rounded-[96px]">
          <h2 className="text-[20px] md:text-[30px] font-bold">Step 1</h2>

          <Image
            src={icon1}
            alt="back1"
            className="max-md:w-[60px] mt-[20px] md:mt-[60px] mb-[20px] md:mb-[35px]"
          />
          <h2 className="text-[15px] md:text-[25px] font-bold ">
            Select Your Plan
          </h2>
          <p className="mt-[20px] md:px-6   max-md:text-mSParaGraph ">
            Choose the plan that best suits your business needs: 3 days of
            backup internet, or everyday downtime-less service.
          </p>
        </div>
        <div className="bg-white text-center w-[250px] md:w-[380px] p-6 md:p-10 flex flex-col items-center rounded-[11px] md:rounded-[96px]">
          <h2 className="text-[20px] md:text-[30px] font-bold">Step 2</h2>

          <Image
            src={icon3}
            alt="back1"
            className="max-md:w-[60px] mt-[20px] md:mt-[60px] mb-[20px] md:mb-[35px]"
          />
          <h2 className="text-[15px] md:text-[25px] font-bold mt-2">
            Receive Your <br />
            Netlink&#174; Device
          </h2>
          <p className="mt-[20px] md:px-6 max-md:text-mSParaGraph">
            Once you've selected your plan, we'll quickly deliver the NetLink®
            device to your location. It’s a compact router with sophisticated
            multi-carrier technology.
          </p>
        </div>
        <div className="bg-white text-center w-[250px] md:w-[380px]  p-6 md:p-10 flex flex-col items-center rounded-[11px] md:rounded-[96px]">
          <h2 className="text-[20px] md:text-[30px] font-bold">Step 3</h2>

          <Image
            src={icon2}
            alt="back1"
            className="max-md:w-[60px] mt-[20px] md:mt-[60px] mb-[20px] md:mb-[35px]"
          />
          <h2 className="text-[15px] md:text-[25px] font-bold -mt-2">
            Connect to <br />
            the Internet
          </h2>
          <p className="mt-[20px] md:px-6  max-md:text-mSParaGraph">
            Power-on the device and stay connected. If you need any assistance,
            our 24/7 chat and call support is here to help.
          </p>
        </div>
      </div>
      <div className="text-white text-center mt-[40px] md:mt-[80px]">
        <p className="md:px-20   max-md:text-mSParaGraph ">
          Our complete backup internet solution is your businesss best friend
          when it comes to internet reliability. With cutting-edge technology,
          multiple carrier redundancy, and unbeatable support, we offer an
          insurance policy that safeguards your business operations, so you can
          focus on what you do best.
        </p>
        <button
          className="border-2 rounded-[30px] mt-[30px] md:mt-[60px]  font-bold text-[#3E70B7] bg-white w-[160px] h-[43px]
            max-md:text-msButton max-md:py-[4px] max-md:px-[15px]
        "
          onClick={() => router.push("/plans")}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default SimpleStep;
