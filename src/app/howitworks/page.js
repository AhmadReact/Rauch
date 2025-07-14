import Image from "next/image";
import React from "react";
import icon1 from "../assets/Group 212.png";
import icon2 from "../assets/Group 213.png";
import icon3 from "../assets/Group 216.png";
import icon4 from "../assets/Group 221.png";
import icon5 from "../assets/Group 222.png";
import icon6 from "../assets/Group 223.png";
import NetworkMap from "../Components/NetworkMap";
import SimpleStep from "../Components/SimpleStep";
import NetLinkCommand from "../Components/NetLinkCommand";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const HowItWorks = ({ sectionRef }) => {
  return (
    <>
      <Header />
      <div
        className="py-[30px] md:py-[60px] px-8 md:px-[calc(10vw)]"
        id="section3"
        ref={sectionRef}
      >
        <div>
          <h2 className="text-mHeadingLarge md:text-dFontSize font-bold text-center font-avenir-black">
            How it Works
          </h2>
          <p className="max-md:text-mHeadingSmall md:text-[20px] font-bold text-center">
            Complete Backup Internet for Business
          </p>
          <p className="max-md:text-mSParaGraph mt-[20px]  text-center">
            Welcome to the future of business internet resilience. Our
            revolutionary solution offers seamless operation of our
            state-of-the-art DataFailover® system and NetLink® technology,
            ensuring your business stays connected even when your primary
            internet falters.
          </p>
          <p className="max-md:text-mSParaGraph mt-[20px]  md:px-14  text-center">
            When your primary internet connection experiences downtime, our
            automatic DataFailover® technology steps in to keep your business
            operations running smoothly. It's the ultimate insurance policy,
            ensuring that you never miss a beat, no matter what disruptions may
            come your way.
          </p>
        </div>
        <div>
          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon1} alt="icon1" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold ">
                NetScan with Zero Configuration
              </h2>
              <p className="max-md:text-mSParaGraph md:text-[20px] max-md:text-center">
                The NetLink® router provides a revolutionary dynamic allocation
                of connectivity. At power-on, the NetLink® router will
                automatically detect the region where you are located and
                seamlessly connect to the strongest available cellular network.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon4} alt="icon3" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold">
                Multiple Carrier Redundancy
              </h2>
              <p className="max-md:text-[15px] md:text-[20px] max-md:text-center">
                Unlike traditional single-carrier solutions, our system offers
                the advantage of multiple carrier redundancy. If one carrier
                goes down, our NetLink® router will search for the next best
                available celluar carrier. This is a powerful advantage in
                storms, natural disasters, malicious internet cutoff, and in
                areas where internet can be spotty.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon3} alt="icon4" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold">
                Automatic Backup
              </h2>
              <p className="max-md:text-[15px] md:text-[20px] max-md:text-center">
                You dont need to do a thing - the system will detect when
                there’s no internet connection. Give it 90 seconds and it will
                switch to the next best carrier on its own. No intervention is
                needed on your end.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon2} alt="icon4" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold">
                Most Reliable and Cost-Effective Solution
              </h2>
              <p className="max-md:text-[15px] md:text-[20px] max-md:text-center">
                No other providers come close to the reliability and
                cost-effectiveness of our solution. Our technology stands head
                and shoulders above the competition, providing a level of
                reliability and resilience that others can't match. Our
                partnerships with multiple carriers, which you can seamlessly
                connect to, gives you pricing that is the most competitive in
                the industry. It's a combination that ensures your business
                stays operational without breaking the bank.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon5} alt="icon5" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold">
                Unparalleled Support
              </h2>
              <p className="max-md:text-[15px] md:text-[20px] max-md:text-center">
                Our NetLink® device connects to the internet easily. If you need
                help, we have experienced engineers on staff to assist you with
                any questions or issues that may arise. This unrivaled service
                ensures you’re engaging with knowledgeable professionals. With
                24/7 call and chat support, you're never alone in managing your
                backup internet.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-md:items-center gap-x-5 mt-8">
            <div className="min-w-[50px] relative top-1 max-w-[50px]">
              <Image src={icon6} alt="icon6" />
            </div>
            <div className="max-md:mt-[13px]">
              <h2 className="text-mSParaGraph  max-md:text-center md:text-[20px] font-bold">
                Static IP
              </h2>
              <p className="max-md:text-[15px] md:text-[20px] max-md:text-center">
                We provide the option for static IP addresses, ensuring that in
                the event of an internet outage and a switch to an alternate
                carrier, your connections remain stable without requiring
                reconfiguration. This feature preserves your recognized IP
                address, crucial for scenarios like security camera systems,
                guaranteeing the retention of vital footage and maintaining
                consistent functionality across various applications and
                devices.
              </p>
            </div>
          </div>
        </div>
      </div>
      <NetworkMap />
      <SimpleStep />
      <NetLinkCommand />
      <Footer one={6} two={7} three={8} />
    </>
  );
};

export default HowItWorks;
