import React from "react";
import routerimg from "../assets/router.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
const JustOneCarrier = ({getStaredSection}) => {

  const router = useRouter();
  return (<>
  <div className="bg-[#36B5C0] py-[40px] md:py-[90px] px-8 md:px-[calc(5vw)]">
    <div className=" flex flex-col-reverse md:flex-row ">
      
      <div className="basis-1/2 flex max-md:text-center text-white justify-center max-md:items-center">
        <div className="">
        <h2 className="max-md:hidden md:block text-mHeadingMedium md:text-[50px] ">Not Just One Carrier</h2>
        <h2 className="max-md:hidden md:block text-mHeadingLarge text-nowrap  md:text-dFontSize leading-[32px] mb-[48px] font-bold">Multiple Carriers!</h2>


       <p className="mb-6 mt-6  ">When other carriers go down, we still got it.</p>
        
        <p className="mb-7 ">Our powerful NetLink® can connect to the best available cell carriers in the area. If a storm comes and two carriers go down, our revolutionary technology can use another one that still works.</p>   
   
        <p className="mb-7 ">It’s the most affordable solution in the nation, and the most reliable.</p>
       
        </div>
      </div>
      <div className="basis-1/2 ">
        <div className="text-center md:hidden text-white md:leading-none" >
        <h2 className="text-mHeadingMedium md:text-[50px] ">Not Just One Carrier</h2>
        <h2 className="text-mHeadingLarge font-bold md:text-dFontSize leading-[32px] mb-[15px]">Multiple Carriers!</h2>
        </div>
        <div className="flex justify-center">
        <Image  src={routerimg} className="object-contain lg:relative lg:left-16 xl:scale-[1.3] w-[211px] md:w-[400px]"  alt="router" />
      </div>
      </div>
      
    </div>
    <div className="flex justify-center bg-[#36B5C0] mt-[40px]">
      <button className="max-md:text-msButton max-md:py-[4px] max-md:px-[15px] bg-[#ffff] text-[#36B5C0]  rounded-[25px] font-bold  md:w-[160px] md:h-[43px]" onClick={()=>router.push('/howitworks')}>See how it works</button>
      </div>
      </div>
    </>
  );
};

export default JustOneCarrier;
