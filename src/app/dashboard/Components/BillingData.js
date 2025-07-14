import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./PaymentModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  customerInvoices,
  getCustomerDetail,
  getUserBillingCards,
} from "@/app/store/thunks/UserThunks";

const BillingData = () => {
  const { account_statement, userInfo } = useSelector((state) => {
    return state.user;
  });

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account_statement) {
      dispatch(getCustomerDetail(userInfo.hash));
      dispatch(getUserBillingCards(userInfo.id));
      dispatch(customerInvoices(userInfo));
    }
  }, []);

  if (!account_statement) return <div></div>;

  return (
    <>
      <div>
        <div className="border-solid border border-grey flex flex-col items-center justify-between min-h-72">
          <div className="flex flex-col items-center m-10">
            <p className="text-[15px] text-[#B2B9BD]">Total Due</p>
            <p className="text-[22px]">{account_statement.due_date}</p>
            <p className="text-[40px] text-dfblue mt-10px">
              {" "}
              ${account_statement.total[0]}.{account_statement.total[1]}
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <p
              className="text-[14px] text-dfblue cursor-pointer italic underline pb-4"
              onClick={() => {
                document.getElementById("my-account").click();
                setTimeout(() => {
                  document
                    .getElementById("payment")
                    .scrollIntoView({ behavior: "smooth" });
                }, 400);
              }}
            >
              Edit Billing Preferences
            </p>
            <button
              onClick={() => setOpen(!open)}
              className="h-12 w-full bg-dfblue text-white"
            >
              Make Payment
            </button>
          </div>
        </div>
        <div>
          <Link href="/plans" className="add-line">
            Add a new line <i>+</i>
          </Link>
        </div>
      </div>
      <PaymentModal
        open={open}
        setOpen={setOpen}
        totalAmount={
          account_statement.total[0] + "." + account_statement.total[1]
        }
      />
    </>
  );
};

export default BillingData;
