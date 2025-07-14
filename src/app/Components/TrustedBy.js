import Image from "next/image";
import React from "react";
import verizon from "../assets/verizon.png";
import ibm from "../assets/ibm.png";
import anderson from "../assets/anderson.png";
import un from "../assets/un.png";
import telekom from "../assets/telekom.png";
import defence from "../assets/defence.png";
import { reviews } from "../helperData/constants";

const TrustedBy = ({one,two,three}) => {

 



  return (<>
    <div className="px-8 md:px-[calc(7vw)] ">
      {/* <div>
        <h2 className="text-mFontSize md:text-dFontSize text-center">
          Trusted by Large and Small{" "}
        </h2>
        <h2 className="text-mFontSize md:text-dFontSize font-bold text-center">
          Businesses Around the World
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center ">
        <div>
          {" "}
          <Image src={verizon} alt="verizon" />
        </div>{" "}
        <div>
          {" "}
          <Image src={ibm} alt="ibm" />
        </div>{" "}
        <div>
          {" "}
          <Image src={anderson} alt="anderson"  />
        </div>
        <div>
          {" "}
          <Image src={un}  alt="un" />
        </div>{" "}
        <div>
          {" "}
          <Image src={telekom} alt="telekom" />
        </div>
        <div>
          {" "}
          <Image src={defence}  alt="defence"/>
        </div>{" "}
      </div> */}

    </div>

    <div className="flex flex-col md:flex-row max-md:items-center bg-[#F0F0F0] py-[30px] md:py-[100px] px-8 md:px-[calc(7vw)] ">
  <div className="max-md:pb-[20px] md:py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] md:border-r-[1px] md:border-r-[#545454] w-[800px] max-md:w-[100%]">
    <p className="max-md:text-center max-md:text-mSParaGraph">{reviews[one].review}</p>
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold md:hidden">{reviews[one].owner}</h2>
  </div>
  <div className="py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] md:border-r-[1px] md:border-r-[#545454] w-[800px] max-md:w-[100%] flex-grow">
    <p className="max-md:text-center max-md:text-mSParaGraph">{reviews[two].review}</p>
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold md:hidden">{reviews[two].owner}</h2>
  </div>
  <div className="py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] w-[800px] max-md:w-[100%]">
    <p className="max-md:text-center max-md:text-mSParaGraph">{reviews[three].review}</p>
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold md:hidden" >{reviews[three].owner}</h2>
  </div>

</div>
<div className="flex flex-col md:flex-row bg-[#F0F0F0]  pb-[90px] md:px-[calc(7vw)] max-md:hidden  mt-[-150px] ">
  <div className="max-md:pb-[20px] md:py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] md:border-r-[1px] md:border-r-[#545454] w-[800px] max-md:w-[100%]">
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold mb-3">{reviews[one].owner}</h2>
  </div>
  <div className="py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] md:border-r-[1px] md:border-r-[#545454] w-[800px] max-md:w-[100%] flex-grow">
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold mb-3">{reviews[two].owner}</h2>
  </div>
  <div className="py-[20px] md:px-[20px] max-md:border-b-[1px] max-md:border-b-[#545454] w-[800px] max-md:w-[100%]">
    <h2 className="mt-[30px] max-md:text-center md:italic font-bold mb-3">{reviews[three].owner}</h2>
  </div>

</div>

        
        </>
  );
};

export default TrustedBy;
