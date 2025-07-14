import Image from "next/image";
import React from "react";
import icon1 from "../assets/Group 212.png";
import icon2 from "../assets/Group 213.png";
import icon3 from "../assets/Group 216.png";
import icon4 from "../assets/Group 221.png";
import icon5 from "../assets/Group 222.png";
import icon6 from "../assets/Group 223.png";


const HowItWorks = ({ sectionRef }) => {
  return (
    <div className="py-[60px] px-8 md:px-[calc(10vw)]" id="section3" ref={sectionRef}>
      <div>
        <h2 className="text-mHeadingLarge  md:text-dFontSize font-bold text-center">
          How it Works
        </h2>
        <p className=" text-center">Complete Backup Internet for Business</p>
        <p className="mt-[20px]  text-center">
          Welcome to the future of business internet resilience. Our
          revolutionary solution offers seamless operation of our
          state-of-the-art DataFailover® system and NetLink® technology,
          ensuring your business stays connected even when your primary internet
          falters.
        </p>
        <p className="mt-[20px] px-14   md:text-center">
          When your primary internet connection experiences downtime, our
          automatic DataFailover® technology steps in to keep your business
          operations running smoothly. It's the ultimate insurance policy,
          ensuring that you never miss a beat, no matter what disruptions may
          come your way.
        </p>
      </div>
      <div>

        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon1}  alt="icon1"/></div>
        <div>
            <h2 className="text-[20px]">NetScan with Zero Configuration</h2>
            <p>The NetLink® router provides a revolutionary dynamic allocation of connectivity. At power-on, the NetLink® router will automatically detect the region where you are located and seamlessly connect to the strongest available cellular network.</p>
        </div>
        </div>

        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon4} alt="icon3" /></div>
        <div>
            <h2 className="text-[20px]">Multiple Carrier Redundancy</h2>
            <p>Unlike traditional single-carrier solutions, our system offers the advantage of multiple carrier redundancy. If one carrier goes down, our NetLink® router will search for the next best available celluar carrier. This is a powerful advantage in storms, natural disasters, malicious internet cutoff, and in areas where internet can be spotty.</p>
        </div>
        </div>

        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon3} alt="icon4" /></div>
        <div>
            <h2 className="text-[20px]">Automatic Backup</h2>
            <p>You dont need to do a thing - the system will detect when there’s no internet connection. Give it 90 seconds and it will switch to the next best carrier on its own. No intervention is needed on your end.</p>
        </div>
        </div>

        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon2} alt="icon4" /></div>
        <div>
            <h2 className="text-[20px]">Most Reliable and Cost-Effective Solution</h2>
            <p>No other providers come close to the reliability and cost-effectiveness of our solution. Our technology stands head and shoulders above the competition, providing a level of reliability and resilience that others can't match. Our partnerships with multiple carriers, which you can seamlessly connect to, gives you pricing that is the most competitive in the industry. It's a combination that ensures your business stays operational without breaking the bank.</p>
        </div>
        </div>


        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon5} alt="icon5" /></div>
        <div>
            <h2 className="text-[20px]">Unparalleled Support</h2>
            <p>Our NetLink® device connects to the internet easily. If you need help, we have experienced engineers on staff to assist you with any questions or issues that may arise. This unrivaled service ensures you’re engaging with knowledgeable professionals. With 24/7 call and chat support, you're never alone in managing your backup internet.</p>
        </div>
        </div>


        <div className="flex gap-x-5 mt-8">
        <div className="min-w-[50px] relative top-3 max-w-[50px]"><Image src={icon6} alt="icon6" /></div>
        <div>
            <h2 className="text-[20px]">Static IP</h2>
            <p>We provide the option for static IP addresses, ensuring that in the event of an internet outage and a switch to an alternate carrier, your connections remain stable without requiring reconfiguration. This feature preserves your recognized IP address, crucial for scenarios like security camera systems, guaranteeing the retention of vital footage and maintaining consistent functionality across various applications and devices.</p>
        </div>
        </div>


      </div>
    </div>
  );
};

export default HowItWorks;
