"use client";
import React, { useState } from "react";
import Image from "next/image";
import Mob from "../../assets/mob.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Modal,
  TextField,
} from "@mui/material";
import { useFetchSubscriptionsQuery } from "@/app/store/apis/API";
import { updateSubLabel } from "@/app/store/thunks/UserThunks";
import BasicTabs from "./Tabs";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import { FaChevronDown } from "react-icons/fa";
import BasicMenu from "./DropDown";
import TriggersTooltips from "./DropDown";
import ChangePlanModal from "./ChangePlanModal";
import { data } from "autoprefixer";
const MonthlyBilling = () => {
  const { account_statement, userInfo } = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  const [showEditState, setShowEditState] = useState();
  const {
    data: subscriptions,
    refetch,
    isFetching,
  } = useFetchSubscriptionsQuery({ id: userInfo.id, hash: userInfo.hash });
  const [labelName, setcustomerlabelName] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (obj) => {
    setOpen(true);
    setSelected(obj);
  };
  const handleClose = () => setOpen(false);
  function addonCharges(subcription) {
    return subcription.subscription_addon_not_removed
      .map((sub) => sub.addons)
      .flat()
      .reduce((sum, addon) => sum + addon.amount_recurring, 0);
  }

  function updateLabel(obj) {
    dispatch(updateLoaderState(true));
    dispatch(updateSubLabel(obj))
      .unwrap()
      .then(() => {
        refetch().then(() => {
          dispatch(updateLoaderState(false));
          setShowEditState("");
        });
      });
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [selected, setSelected] = useState({ id: 0, act_date: "" });

  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState();

  return (
    <>
      {/** Section 1*/}
      <div className="pt-10">
        <h1 className="text-[32px] font-normal">Your Bill</h1>
        <div className="rounded-md">
          <h2 className="text-[#4c606b] text-[14px] lg:text-[16px] pb-2">
            Charges for {account_statement.billing_start} to{" "}
            {account_statement.billing_end}
          </h2>
        </div>
        <hr></hr>
        <div className="flex flex-col lg:flex-row lg:justify-between py-8 lg:py-12">
          <div className="pb-[20px] flex  flex-col">
            <h4 className="text-[#aab8bd] text-[14px] font-bold text-center mb-4">
              Charges
            </h4>
            <h2 className="text-[#4c606b] text-[36px] font-medium	text-center ">
              ${account_statement.charges[0]}.{account_statement.charges[1]}
            </h2>
          </div>
          <div className="pb-[20px] flex flex-col">
            <h4 className="text-[#aab8bd] text-[14px] font-bold text-center mb-4">
              Payments/Credits
            </h4>
            <h2 className="text-[#4c606b] text-[36px] font-medium	text-center ">
              ${account_statement.payment[0]}.{account_statement.payment[1]}
            </h2>
          </div>
          <div className="pb-[20px] flex flex-col">
            <h4 className="text-[#aab8bd] text-[14px] font-bold text-center mb-4">
              Past Due
            </h4>
            <h2 className="text-[#4c606b] text-[36px] font-medium text-center 	 ">
              ${account_statement.past_due[0]}.{account_statement.past_due[1]}
            </h2>
          </div>
          <div className="pb-[20px] flex flex-col">
            <h4 className="text-[#aab8bd] text-[14px] font-bold text-center mb-4">
              Total Due
            </h4>
            <h2 className="text-[#4c606b] text-[36px] font-medium	text-center">
              ${account_statement.total[0]}.{account_statement.total[1]}
            </h2>
            <h4 className="text-[#aab8bd] text-[14px] font-bold text-center">
              {account_statement.due_date}
            </h4>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="text-[32px] font-normal">My Plans</h1>
        <hr></hr>
        {isFetching ? (
          <div className="text-center flicker h-[80px] flex items-center justify-center">
            Fetching subscriptions...{" "}
          </div>
        ) : (
          <>
            {subscriptions?.["customer-plans"]?.map((value) => (
              <>
                <hr />

                <div className=" flex my-4 flex-col lg:flex-row">
                  <div className="myplans  border-b lg:border-b-0 lg:border-r border-gray-300 py-4 lg:py-0 w-full md:w-2/5">
                    <div className="flex ">
                      <div className="mr-4">
                        <Image
                          src={
                            value?.device?.primary_image ??
                            value?.plan?.image ??
                            Mob
                          }
                          alt="mob"
                          width={100}
                          height={150}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="mb-4">
                          <h2 className=" text-[#aab8bd]">NA</h2>
                          <h2 className="text-[14px] font-bold">
                            {value.phone_number_formatted}
                          </h2>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex flex-col gap-y-2 my-4">
                            <h4 className="text-[#aab8bd] ">label</h4>
                            {showEditState && showEditState === value.id ? (
                              <TextField
                                type="text"
                                className="border border-gray-300  rounded"
                                defaultValue={value?.label}
                                onChange={(e) =>
                                  setcustomerlabelName(e.target.value)
                                }
                              />
                            ) : (
                              <h4 className="text-[14px] font-bold">
                                {value.label}
                              </h4>
                            )}
                            {showEditState && showEditState === value?.id ? (
                              <div className="flex">
                                <button
                                  className="cancel-button bg-white text-red-600 border border-red-600 px-2 py-2 rounded mr-2"
                                  onClick={() => setShowEditState()}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="save-button bg-[#33cccc]   text-white   px-4 py-2 rounded"
                                  onClick={() =>
                                    updateLabel({
                                      id: value.id,
                                      label: labelName
                                        ? labelName
                                        : value?.label,
                                    })
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                className="edit-button mb-2 bg-[#e8f7fa]  text-[#aab8bd] px-4 py-2 rounded"
                                onClick={() => setShowEditState(value.id)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" flex gap-x-6">
                      <table className="w-full ">
                        <tbody>
                          <tr>
                            <th className="text-[#aab8bd] text-center">
                              Data Usage
                            </th>
                            <th className="voice-usage text-center text-[#aab8bd]">
                              Voice Usage
                            </th>
                            <th className="text-center text-[#aab8bd]">
                              Text Usage
                            </th>
                          </tr>
                          <tr>
                            <td className="text-center">0 GB</td>
                            <td className="text-center">0 MINs</td>
                            <td className="text-center">0 SMS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-center mt-[15px]">
                      <button
                        className="usagesbtn bg-dfblue p-1  text-white px-4 py-2 rounded-full"
                        onClick={() => handleOpen(value)}
                        type="button"
                      >
                        View Usage
                      </button>
                    </div>
                  </div>

                  <div className="myplans border-b lg:border-b-0 lg:border-r border-gray-300 w-full pl-4 py-4 lg:py-0 md:w-2/5">
                    <h2 className="NA1 text-[#aab8bd]">Plan</h2>
                    <h3 className="text-[14px] font-bold">
                      {value?.plan?.name}
                    </h3>

                    <br />
                    <h2 className="NA1 text-[#aab8bd]">Features</h2>
                    {value?.subscription_addon_not_removed.map((obj, i) => {
                      return (
                        <h3 className="font-bold" key={i}>
                          {obj.addons.name}
                        </h3>
                      );
                    })}
                    <h3 className="text-[14px] font-bold"></h3>

                    <br />
                    <h2 className="NA1 text-[#aab8bd]">Monthly Charges</h2>
                    <h3 className="text-[14px] font-bold">
                      ${addonCharges(value) + value?.plan?.amount_recurring}
                      <span>.00</span>
                    </h3>
                  </div>

                  <div className="myplans w-full md:w-2/5 pl-4 ">
                    <h2 className="NA1 text-[#aab8bd]">IMEI</h2>
                    <div className="flex justify-between">
                      <h3 className="text-[14px] font-bold"></h3>
                      {value.status == "active" && (
                        <TriggersTooltips
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          setCurrentData={setCurrentData}
                          data={value}
                        />
                      )}
                    </div>
                    <br />
                    <h2 className="NA1 text-[#aab8bd]">SIM</h2>
                    <p>{value?.sim_card_num}</p>
                  </div>
                </div>
                <hr />
              </>
            ))}

            <div className="flex flex-col lg:flex-row  lg:justify-between items-center mt-4 px-10 py-12">
              <div>
                <table className="total">
                  <tr>
                    <td className="text-[#aab8bd] pr-12 py-2">Subtotal</td>
                    <td className="text-[#4c606b] font-bold">
                      ${subscriptions?.monthlyAmountDetails?.subtotal}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#aab8bd] pr-12 py-2">Plan Payment</td>
                    <td className="text-[#4c606b] font-bold">
                      ${subscriptions?.monthlyAmountDetails?.regulatoryFee}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#aab8bd] pr-12 py-2">State Tax</td>
                    <td className="text-[#4c606b] font-bold">
                      ${subscriptions?.monthlyAmountDetails?.stateTax}
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <p className="max-md:mt-5 md:pr-12">
                  Monthly Total :&nbsp;
                  <span className="text-[#4c606b] font-bold">
                    ${subscriptions?.monthlyAmountDetails?.monthlyTotalAmount}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {currentData && (
        <ChangePlanModal
          open={openModal}
          setOpen={setOpenModal}
          data={currentData}
        />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BasicTabs id={selected.id} act_date={selected.act_date} />
        </Box>
      </Modal>
    </>
  );
};

export default MonthlyBilling;
