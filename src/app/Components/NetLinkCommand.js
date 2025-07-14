"use client"
import React from "react";
import laptop from "../assets/Group 205.png";
import laptopMobile from "../assets/Group 343.png";

import LaptopNetlink from "../assets/LaptopNetlink.png";

import Image from "next/image";
import icon1 from "../assets/Group 210.png";
import icon2 from "../assets/Group 206.png";
import icon3 from "../assets/Group 208.png";
import { useRouter } from "next/navigation";
const NetLinkCommand = ({technicalSpecRef}) => {

  const router = useRouter()


  return (
    <>
      <div id="section4" className="flex md:justify-center md:gap-x-20  py-[30px] md:py-[60px] max-md:px-8 md:pl-[calc(10vw)]" ref={technicalSpecRef}>
        <div className="flex flex-col justify-center basis-[100%] md:basis-[60%]  flex-shrink">
          <div className=" ">
            <h1 className="text-mHeadingLarge md:text-dFontSize font-bold mb-5 md:mb-10 max-md:text-center">
           
                       NetLink Command®
            </h1>
            <div className="basis-[40%] flex-1 md:hidden max-md:text-center flex justify-center items-center">
                 <Image src={laptopMobile} alt="LaptopNetlink" />
            </div>
           
            <p className="md:text-[20px]
            max-md:text-[15px]
            max-md:mt-6
            max-md:text-center
            ">
              Your Data Failover® service comes with unparalleled control and
              reliability with NetLink Command® - your all-in-one application
              for efficient, end-to-end management of cellular data connectivity
              and routers on the cloud. Say goodbye to connectivity headaches
              and hello to seamless, intelligent connectivity management.
            </p>
          </div>
        </div>
        <div className="basis-[40%] flex-1 hidden md:block
        
        
        
        ">
          <Image src={laptop} alt="laptop" />
        </div>
     

      </div>
      <div className="flex flex-col gap-y-10 py-[25px] md:py-[60px] px-8 md:px-[calc(10vw)] text-[20px]">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-x-10">
          <div className="w-[50px] md:min-w-[75px]
          max-md:w-[31px]">
            <Image src={icon1} alt="icon1" />
          </div>
          <div>
            <h2 className="font-bold max-md:text-[15px]">End-to-End Control</h2>
            <p className="max-md:text-[15px]
            
            ">
              Manage clients, users, IPs and activate/suspend seamlessly. Enjoy
              full control over your network environment without being caught in
              the middle between router vendors and carriers.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-x-10">
          <div className="w-[50px] md:min-w-[75px] max-md:w-[31px]">
            <Image src={icon2}  alt="icon2"/>
          </div>
          <div>
            
            <h2 className="font-bold max-md:text-[15px]">Proactive Monitoring and Notifications</h2>
            <p className="max-md:text-[15px]">
            Receive real-time notifications when routers are down, accompanied by an up-time graph for 
            historical performance analysis
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-x-10">
          <div className="w-[50px] md:min-w-[75px] max-md:w-[31px]">
            <Image src={icon3} alt="icon3"/>
          </div>
          <div>
            <h2 className="font-bold max-md:text-[15px]">Robust Personalization</h2>
            <p className="max-md:text-[15px]">
            From port forwarding and VPNs to billing and router activation/suspension, NetLink Command® offers a complete suite of tools to tailor your internet environments to your specific needs.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-[30px] px-9 md:px-[calc(10vw)] bg-[#F0F0F0]">
      <h2 className="font-bold text-[20px] max-md:text-[15px]">Included Features</h2>
      <p className="md:text-[20px] max-md:text-[15px] ">
        Router Management | Plan Management | Activate and Suspend Service | Credential Management | GPS Location Port Forwarding | Port Testing | NetScan Carrier Search | VPN Management | Up-Time Graph | LinkDown Outage Notifications Connection Testing | Router Reboot | Network Topology | IP Whitelisting | Dedicated IPs
      </p>
    </div>
      <div className="text-center py-[25px] md:py-[60px] px-8 md:px-[calc(10vw)] ">

      <p className="max-md:text-[15px] md:text-[20px]">
       Get started today and experience the peace of mind that comes with never losing connectivity again.
    </p>
<button className="rounded-[30px] mt-[20px]  font-bold text-white bg-dfyellow max-md:bg-[#333333] max-md:text-dfyellow w-[160px] h-[43px]
      max-md:text-msButton max-md:py-[4px] max-md:px-[15px]
" onClick={() => router.push('/plans')}>Get started</button>
      </div>
    </>
  );
};

export default NetLinkCommand;
