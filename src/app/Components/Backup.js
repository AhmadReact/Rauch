"use client";
import { useRouter } from "next/navigation";
// import bg from "../assets/backup1.png";
import React from "react";

const Backup = ({ scrollToSection }) => {
  const router = useRouter();

  return (
    <div
      // style={{ backgroundImage: `url(${bg.src})` }}
      className="bg-dfblue w-full flex flex-col justify-center items-center p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)] lg:h-[500px]"
      id="section1"
    >
      <div className="max-w-[1100px]">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-14 font-[math]">
          Stay safe & independent, with 24/7 emergency support anytime, anywhere
        </h1>
        <button
          className="max-md:min-w-[115px] max-md:min-h-[27px] max-md:text-msButton border-2 bg-white text-dfblue  md:w-[160px] xl:w-[180px] md:h-[43px] rounded-[30px] border-white   "
          onClick={() => router.push("/plans")}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Backup;
