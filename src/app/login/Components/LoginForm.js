import React, { useEffect, useState } from "react";
import logo from "../../assets/lgogo.png";
import Image from "next/image";
import { useFormik } from "formik";
import { useAuthenticateUserMutation } from "@/app/store/apis/API";
import Swal from "sweetalert2";
import {
  customerInvoices,
  getCustomerDetail,
  getCustomerOrder,
  getUserBillingCards,
} from "@/app/store/thunks/UserThunks";
import { fetchHashing } from "@/app/store/thunks/CartThunks";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { autoLogin } from "@/app/services/services";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authenticateUser, { isLoading: isSigning }] =
    useAuthenticateUserMutation();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      authenticateUser(formik.values)
        .then((result) => {
          if (result.error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: result.error.data.details,
            });
            setIsLoading(false);
          } else {
            dispatch(getCustomerOrder(result.data.id))
              .unwrap()
              .then((result) => {
                if (!result.order_hash) {
                  dispatch(fetchHashing());
                }
              });

            dispatch(getCustomerDetail(result.data.hash));
            dispatch(getUserBillingCards(result.data.id));
            dispatch(customerInvoices(result.data))
              .unwrap()
              .then(() => {
                setIsLoading(false);
                router.push("/dashboard");
              });
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    validate: (values) => {
      const errors = {};

      if (!values.identifier) {
        errors.identifier = "Email is required";
      } else if (
        !String(values.identifier)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        errors.identifier = "Enter valid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
  });

  return (
    <div className="bg-[#262626]  shadow-2xl h-[600px] max-sm:h-[474px] max-sm:w-[90vw] w-[420px] pt-[40px] pb-[10px] px-[50px] flex flex-col justify-between">
      <div className="flex justify-center">
        <Image src={logo} className="w-[100px] md:w-[120px]" alt="logo" />
      </div>

      <div className="flex flex-col items-center gap-y-[20px]">
        <h2 className="text-[#F7FCFD] text-[20px]">User Login</h2>
        <div className="w-[100%] ">
          <input
            type="text"
            placeholder="Email"
            className="w-[100%] h-[30px]  text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
            onChange={formik.handleChange}
            value={formik.values.identifier}
            name="identifier"
          />
          <div className="mt-2 text-red-400 text-[12px] h-[12px]">
            {formik?.errors?.identifier}
          </div>
        </div>

        <div className="w-[100%]  text-white text-[12px]">
          <input
            type="password"
            placeholder="Password"
            className="w-[100%] h-[30px] text-[#FFFFFF] placeholder:text-white rounded-[5px] outline-none p-[20px] text-[12px] bg-[#5B5C5E]"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
          />

          <div className="flex justify-between">
            <div className="mt-2 text-red-400 text-[12px] h-[12px]">
              {formik?.errors?.password}
            </div>
            <h2
              className="mt-2 text-right cursor-pointer"
              onClick={() => router.push("/forgot")}
            >
              Forgot Password?
            </h2>
          </div>
        </div>
      </div>

      <button
        className="bg-white w-[100%] rounded-[10px] h-[40px] font-bold  text-[12px] px-[20px] "
        type="submit"
        onClick={formik.handleSubmit}
      >
        {isLoading ? <LinearProgress color="inherit" /> : "Log in"}
      </button>

      <div></div>
    </div>
  );
};

export default LoginForm;
