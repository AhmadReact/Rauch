"use client";
import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerDetail,
  getUserBillingCards,
  makePrimaryCardService,
  removeCustomerCard,
  updateCustomerInfo,
} from "@/app/store/thunks/UserThunks";

import visaCard from "../../assets/visa.jpg";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import AddCreditCard from "./AddCreditCard";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import Swal from "sweetalert2";
import states from "../../helperData/states.json";
import CreditCardTemplate from "./CreditCardTemplate";

const MyAccount = () => {
  const [editName, setEditName] = useState(false);

  const { userInfo, billingCards } = useSelector((state) => {
    return state.user;
  });

  const [tmpUser, setTmpUser] = useState(userInfo);
  const dispatch = useDispatch();
  const makeNameEdit = (name) => {
    setTmpUser(userInfo);
    setEditName(name);
  };

  const saveInfo = (obj) => {
    if (!Object.values(obj)[0]) {
      Swal.fire({
        icon: "error",
        title: "Empty field is not allowed",
      });
      return;
    }

    if (Object.keys(obj)[0] == "email") {
      if (
        !String(Object.values(obj)[0])
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        Swal.fire({
          icon: "error",
          title: "Valid email is required",
        });

        return;
      }
    }

    obj.id = userInfo.id;
    obj.hash = userInfo.hash;
    dispatch(updateLoaderState(true));
    dispatch(updateCustomerInfo(obj))
      .unwrap()
      .then(() => {
        dispatch(updateLoaderState(false));
        dispatch(getCustomerDetail(userInfo.hash));
        setEditName("");
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateLoaderState(false));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  const enableAutopay = (obj) => {
    obj.id = userInfo.id;
    obj.hash = userInfo.hash;
    dispatch(updateLoaderState(true));
    dispatch(updateCustomerInfo(obj))
      .unwrap()
      .then(() => {
        dispatch(updateLoaderState(false));
        dispatch(getCustomerDetail(userInfo.hash));
        setEditName("");
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateLoaderState(false));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTmpUser({ ...tmpUser, [name]: value });
  };

  const RemoveCustomerCard = (id) => {
    Swal.fire({
      title: "Do you want to delete this card?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(updateLoaderState(true));
        dispatch(removeCustomerCard(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "", "success");
            dispatch(updateLoaderState(false));
            dispatch(getUserBillingCards(userInfo.id));
          })
          .catch(() => {
            dispatch(updateLoaderState(false));
            Swal.fire({
              icon: "Error",
              title: "Error Delete Card API",
              text: error,
            });
          });
      }
    });
  };

  const inputRefs = {
    old_password: useRef(),
    password: useRef(),
    password_confirmation: useRef(),
  };

  const MakePrimaryCardHandler = (id) => {
    dispatch(updateLoaderState(true));
    dispatch(
      makePrimaryCardService({ customer_credit_card_id: id, id: userInfo.id })
    )
      .unwrap()
      .then(() => {
        dispatch(getUserBillingCards(userInfo.id))
          .unwrap()
          .then(() => {
            dispatch(updateLoaderState(false));
          });
      })
      .catch(() => {
        dispatch(updateLoaderState(false));
      });
  };

  return (
    <>
      <div className="pt-10">
        <h1 className="text-[32px] font-normal">Account Info</h1>
        <hr></hr>
        <div>
          {[
            { id: "fname", label: "First Name" },
            { id: "lname", label: "Last Name" },
            { id: "email", label: "Email" },
          ].map((obj, i) => {
            return (
              <>
                <div className="flex justify-between" key={i}>
                  <div className="flex flex-col ">
                    <label className="text-[#808080] text-[14px] font-semibold pt-4">
                      {obj.label}
                    </label>
                    <div className="my-4">
                      {editName == obj.id ? (
                        <TextField
                          size="small"
                          onChange={handleChange}
                          name={obj.id}
                          className="text-[#808080] text-[14px]"
                          value={tmpUser[obj.id]}
                        />
                      ) : (
                        <p className=" text-[#808080] text-[14px]">
                          {/* {tmpUser[obj.id]} */}
                          {userInfo[obj.id]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {editName == obj.id ? (
                      <div className="flex">
                        <button
                          onClick={() => makeNameEdit("")}
                          className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#33cccc] text-white text-[14px] p-2 rounded"
                          onClick={() =>
                            saveInfo({ [obj.id]: tmpUser[obj.id] })
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[#e8f7fa] text-[#33cccc] p-2 text-[14px] rounded w-16"
                        onClick={() => makeNameEdit(obj.id)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })}

          <div className="flex justify-between">
            <div className="flex flex-col ">
              <label className="text-[#808080] text-[14px] font-semibold pt-4">
                Current Password
              </label>
              <div className="my-4">
                {editName == "password" ? (
                  <TextField
                    inputRef={inputRefs.old_password}
                    type="text"
                    size="small"
                    name="old_password"
                    className="text-[#808080] text-[14px]"
                  />
                ) : (
                  <p className=" text-[#808080] text-[14px]">******</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col ">
              <label className="text-[#808080] text-[14px] font-semibold pt-4">
                New Password
              </label>
              <div className="my-4">
                {editName == "password" ? (
                  <TextField
                    inputRef={inputRefs.password}
                    name="password"
                    size="small"
                    className="text-[#808080] text-[14px]"
                  />
                ) : (
                  <p className=" text-[#808080] text-[14px]">******</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {editName == "password" ? (
                <div className="flex">
                  <button
                    onClick={() => makeNameEdit("")}
                    className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#33cccc] text-white text-[14px] p-2 rounded"
                    onClick={() =>
                      saveInfo({
                        old_password: inputRefs.old_password.current.value,
                        password: inputRefs.password.current.value,
                        password_confirmation:
                          inputRefs.password_confirmation.current.value,
                      })
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[#e8f7fa] text-[#33cccc] p-2 text-[14px] rounded w-16"
                  onClick={() => makeNameEdit("password")}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <label className="text-[#808080] text-[14px] font-semibold pt-4">
                Retype New Password
              </label>
              <div className="my-4">
                {editName == "password" ? (
                  <TextField
                    inputRef={inputRefs.password_confirmation}
                    name="password_confirmation"
                    size="small"
                    className="text-[#808080] text-[14px]"
                  />
                ) : (
                  <p className=" text-[#808080] text-[14px]">******</p>
                )}
              </div>
            </div>
          </div>
          <hr></hr>

          {[
            { id: "phone", label: "Primary Phone Number" },
            { id: "alternate_phone", label: "Secondary Phone Number" },
          ].map((obj, i) => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="flex flex-col ">
                    <label className="text-[#808080] text-[14px] font-semibold pt-4">
                      {obj.label}
                    </label>
                    <div className="my-4">
                      {editName == obj.id ? (
                        <TextField
                          size="small"
                          onChange={handleChange}
                          name={obj.id}
                          className="text-[#808080] text-[14px]"
                          value={tmpUser[obj.id]}
                        />
                      ) : (
                        <p className=" text-[#808080] text-[14px]">
                          {tmpUser[obj.id]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {editName == obj.id ? (
                      <div className="flex">
                        <button
                          onClick={() => makeNameEdit("")}
                          className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#33cccc] text-white text-[14px] p-2 rounded"
                          onClick={() =>
                            saveInfo({ [obj.id]: tmpUser[obj.id] })
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[#e8f7fa] text-[#33cccc] p-2 text-[14px] rounded w-16"
                        onClick={() => makeNameEdit(obj.id)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })}

          <h1 className="text-[32px] font-normal">Billing</h1>

          {[
            { id: "billing_fname", label: "Billing First Name" },
            { id: "billing_lname", label: "Billing Last Name" },
            { id: "billing_address1", label: "Address 1" },
            { id: "billing_address2", label: "Address 2" },
            { id: "billing_city", label: "City" },
            {
              id: "billing_state_id",
              label: "State",
            },
            {
              id: "billing_zip",
              label: "Postal/Zip code",
            },
          ].map((obj, i) => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="flex flex-col ">
                    <label className="text-[#808080] text-[14px] font-semibold pt-4">
                      {obj.label}
                    </label>
                    <div className="my-4">
                      {editName == obj.id ? (
                        <>
                          {editName == "billing_state_id" ? (
                            <TextField
                              size="small"
                              name={obj.id}
                              onChange={handleChange}
                              value={tmpUser[obj.id]}
                              className="text-[#808080] text-[14px]"
                              select
                            >
                              {states.map((option, i) => (
                                <MenuItem key={i} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              size="small"
                              onChange={handleChange}
                              name={obj.id}
                              className="text-[#808080] text-[14px]"
                              value={tmpUser[obj.id]}
                            />
                          )}
                        </>
                      ) : (
                        <p className=" text-[#808080] text-[14px]">
                          {tmpUser[obj.id]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {editName == obj.id ? (
                      <div className="flex">
                        <button
                          onClick={() => makeNameEdit("")}
                          className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#33cccc] text-white text-[14px] p-2 rounded"
                          onClick={() =>
                            saveInfo({ [obj.id]: tmpUser[obj.id] })
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[#e8f7fa] text-[#33cccc] p-2 text-[14px] rounded w-16"
                        onClick={() => makeNameEdit(obj.id)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })}

          <hr></hr>

          <h1 className="text-[32px] font-normal">Shipping</h1>
          {[
            { id: "shipping_fname", label: "Shipping First Name" },
            { id: "shipping_lname", label: "Shipping Last Name" },
            { id: "shipping_address1", label: "Address 1" },
            { id: "shipping_address2", label: "Address 2" },
            { id: "shipping_city", label: "City" },
            { id: "shipping_state_id", label: "State" },
            {
              id: "shipping_zip",
              label: "Postal/Zip code",
            },
          ].map((obj, i) => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="flex flex-col ">
                    <label className="text-[#808080] text-[14px] font-semibold pt-4">
                      {obj.label}
                    </label>
                    <div className="my-4">
                      {editName == obj.id ? (
                        <>
                          {editName == "shipping_state_id" ? (
                            <TextField
                              size="small"
                              name={obj.id}
                              onChange={handleChange}
                              value={tmpUser[obj.id]}
                              className="text-[#808080] text-[14px]"
                              select
                            >
                              {states.map((option, i) => (
                                <MenuItem key={i} value={option.code}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              size="small"
                              onChange={handleChange}
                              name={obj.id}
                              className="text-[#808080] text-[14px]"
                              value={tmpUser[obj.id]}
                            />
                          )}
                        </>
                      ) : (
                        <p className=" text-[#808080] text-[14px]">
                          {tmpUser[obj.id]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {editName == obj.id ? (
                      <div className="flex">
                        <button
                          onClick={() => makeNameEdit("")}
                          className="text-red-500 text-[14px] p-2 rounded border-solid border border-red-500 mr-3"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#33cccc] text-white text-[14px] p-2 rounded"
                          onClick={() =>
                            saveInfo({ [obj.id]: tmpUser[obj.id] })
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-[#e8f7fa] text-[#33cccc] p-2 text-[14px] rounded w-16"
                        onClick={() => makeNameEdit(obj.id)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })}
        </div>
        <div className="py-5 inline-block">
          <h1 className="text-[24px]">Payment</h1>
          <div
            className="flex bg-[#e8f7fa] items-center mt-6 p-3 rounded-md"
            id="payment"
          >
            <Checkbox
              onChange={() =>
                enableAutopay({ auto_pay: userInfo?.auto_pay == 0 ? 1 : 0 })
              }
              checked={userInfo?.auto_pay == 0 ? false : true}
            ></Checkbox>
            <h2 className="text-[#4c606b] text-[16px]">
              Enroll in Auto-Pay{" "}
              <span className="text-[#aab8bd] text-[16px]">
                Uncheck to Opt-Out of Auto-Pay
              </span>
            </h2>
          </div>
        </div>

        {billingCards?.map((data) => (
          <div key={data.id}>
            <Accordion style={{ marginBottom: 20 }}>
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                  width="60%"
                  direction="row"
                  justifyContent={"space-between"}
                  gap={"20px"}
                  alignItems={"center"}
                >
                  <Stack alignItems={"center"} direction="row" spacing={2.5}>
                    {/* <Image
                      style={{ height: "25px", width: "40px" }}
                      src={
                        data?.card_type == "Visa"
                          ? visaCard
                          : data?.card_type == "Diners"
                          ? dinersCard
                          : masterCard
                      }
                      alt="visa"
                    /> */}

                    <CreditCardTemplate
                      lastDigit={data.last4.slice(-4)}
                      type={data.card_type}
                    />

                    <Stack spacing={0.5}>
                      {data && data.default ? (
                        <p
                          className="primary-card-text"
                          style={{
                            textTransform: "capitalize",
                            fontSize: 14,
                            color: "#8dd43f",
                            fontStyle: "italic",
                            marginBottom: 0,
                          }}
                        >
                          Primary
                        </p>
                      ) : (
                        <a
                          onClick={(e) => {
                            e.stopPropagation();
                            MakePrimaryCardHandler(data?.id);
                          }}
                          style={{
                            textTransform: "capitalize",
                            fontSize: 14,
                            color: "#33cccc",
                            fontStyle: "italic",
                          }}
                        >
                          Make Primary
                        </a>
                      )}

                      <Typography
                        style={{
                          textTransform: "capitalize",
                          fontSize: 14,
                          color: "#4c606b",
                        }}
                      >
                        {data && data.card_type} Ending in{" "}
                        {data && data.last4.slice(-4)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        fontSize: 14,
                        color: "#aab8bd",
                        fontStyle: "italic",
                      }}
                    >
                      Expires
                    </Typography>
                    <Typography
                      style={{ textTransform: "capitalize", fontSize: 14 }}
                    >
                      {data?.expiration}
                    </Typography>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  paddingBlock={"20px"}
                  width="64%"
                  direction="row"
                  justifyContent={"space-between"}
                  gap={"20px"}
                >
                  <Stack
                    alignItems={"baseline"}
                    direction="row"
                    spacing={2.5}
                    marginLeft="58px"
                  >
                    <Stack spacing={0.5}>
                      <a
                        style={{
                          textTransform: "capitalize",
                          fontSize: 14,
                          color: "#aab8bd",
                        }}
                      >
                        Name on card
                      </a>
                      <Typography
                        style={{ textTransform: "capitalize", fontSize: 14 }}
                      >
                        {data?.cardholder}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        fontSize: 14,
                        color: "#aab8bd",
                      }}
                    >
                      Billing Address
                    </Typography>
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        fontSize: 14,
                        lineHeight: "18px",
                      }}
                    >
                      {data?.billing_address1}
                      <br></br>
                      {data?.billing_city}
                      <br></br>
                      {data?.billing_zip}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  paddingBottom={"15px"}
                  alignItems={{ sm: "center", md: "end" }}
                >
                  <button
                    style={{ height: "40px" }}
                    className="cardcancel"
                    onClick={() => RemoveCustomerCard(data?.id)}
                  >
                    Remove
                  </button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}

        <AddCreditCard />
      </div>
    </>
  );
};

export default MyAccount;
