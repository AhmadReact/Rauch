"use client";
import React, { useState } from "react";
import MyAccount from "./MyAccount";
import MonthlyBilling from "./MonthlyBilling";
import BillingHistory from "./BillingHistory";
import { useFetchOrdersQuery } from "@/app/store/apis/API";
import { useDispatch, useSelector } from "react-redux";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
const AccountDetail = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const { data, isFetching } = useFetchOrdersQuery({
    id: userInfo.id,
    hash: userInfo.hash,
  });
  const dispatch = useDispatch();
  if (isFetching) {
    dispatch(updateLoaderState(true));
  } else {
    dispatch(updateLoaderState(false));
  }
  return (
    <>
      <div>
        <div className="bg-dfblue w-full flex h-12 rounded-xl p-1.5">
          <button
            id="my-account"
            className={`${
              selectedTab === 1 ? "bg-white text-dfblue" : "text-white"
            } basis-full md:basis-1/3 rounded-lg text-[12px] font-semibold`}
            onClick={() => setSelectedTab(1)}
          >
            My Account
          </button>
          <button
            className={`${
              selectedTab === 2 ? "bg-white text-dfblue" : "text-white"
            } basis-full md:basis-1/3 rounded-lg text-[12px] font-semibold`}
            onClick={() => setSelectedTab(2)}
          >
            Monthly Billing
          </button>
          <button
            className={`${
              selectedTab === 3 ? "bg-white text-dfblue" : "text-white"
            } basis-full md:basis-1/3 rounded-lg text-[12px] font-semibold`}
            onClick={() => setSelectedTab(3)}
          >
            Billing History
          </button>
        </div>
        <div>
          {selectedTab === 1 && <MyAccount />}
          {selectedTab === 2 && <MonthlyBilling />}
          {selectedTab === 3 && <BillingHistory customer={data} />}
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
