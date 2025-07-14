"use client";

import React from "react";
import PlansCard from "./PlansCard";
import { useFetchPlansQuery } from "@/app/store/apis/API";

const Plans = () => {
  const { data: plans, error: errorplan, isFetching } = useFetchPlansQuery();
  return (
    <div>
      <div className="flex justify-center py-5">
        <h2 className="text-[43px] font-bold max-md:text-center">
          Which plan is right for you?
        </h2>
      </div>
      <div className="flex flex-wrap px-[10%] justify-center gap-[20px] my-[60px] ">
        {plans?.map((plan) => (
          <PlansCard plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
