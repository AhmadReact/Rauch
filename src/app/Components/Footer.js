"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import { useFormik } from "formik";
import Swal from "sweetalert2";
import { supportMessage } from "../services/services";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import Link from "next/link";

const Footer = ({ one, two, three }) => {
  const [isVerified, setIsVerified] = useState(false);

  const { logo: logofoot } = useSelector((state) => {
    return state.company;
  });

  const handleRecaptchaVerify = (response) => {
    setIsVerified(true);
  };

  const recaptchaRef = useRef();

  const router = useRouter();
  const formik2 = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      recaptcha: "",
    },
    onSubmit: (values) => {
      if (Object.keys(formik2.errors).length > 0) {
        return;
      } else {
        if (!isVerified) {
          Swal.fire({
            icon: "Error",
            title: "Captcha Error",
            text: "Please complete the reCAPTCHA verification.",
          });
        } else {
          supportMessage(values).then(() => {
            Swal.fire({
              icon: "success",
              title: "Message Sent",
              text: "Your message has been sent",
            });

            formik2.resetForm();
            setIsVerified(false);
            recaptchaRef.current.reset();
          });
        }
      }
    },
    validate: (values) => {
      const errors = {};
      var zipRegex = /^(?:(\d{5})(?:[ \-](\d{4}))?)$/i;
      // Perform validation logic for each field

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.subject) {
        errors.subject = "Subject is required";
      }

      if (!values.message) {
        errors.message = "Message is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !String(values.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        errors.email = "Enter valid email";
      }

      // Add validation logic for other fields

      return errors;
    },
  });

  const handleView = () => {
    window.open("/Netlink_DataSheet.pdf", "_blank"); // Open the PDF file in a new tab
  };

  const targetRef = useRef(null);

  const scrollToTarget = () => {
    // Scroll to the target element
    const targetOffset = targetRef.current.offsetTop;
    targetRef.current.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: targetOffset - 150,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* <TrustedBy one={one} two={two} three={three} /> */}
      {/* <div className="flex  flex-col lg:flex-row bg-[#36B5C0]  pt-[30px] pb-[30px] md:pt-[100px] md:pb-[100px]  px-8 md:px-[calc(5vw)]">
        <div
          className="flex basis-full md:basis-1/2 max-md:mb-[30px] justify-between flex-col pl-2 pr-2  md:pt-0.5"
          ref={targetRef}
        >
          <div className="md:w-[370px] md:relative md:top-8">
            <p
              className="text-mHeadingLarge md:text-4xl md:text-[60px] text-white font-bold pb-3 mb-5
          max-md:text-center
          max-md:1xl
          max-md:mb-0
      
          
          "
            >
              Contact Us
            </p>
            <p className="text-white pb-[30px] md:mt-[60px]   max-md:text-mSParaGraph">
              Contact us with any questions or inquiries or call 877.789.DATA
              (3282) . We would be happy to answer your questions or inquiries
              and set up a meeting with you at your convinience.
            </p>
            <p className="text-white max-md:text-mSParaGraph  max-md:text-center md:mb-[30px]">
              Toll Free: 877.789.DATA (3282){" "}
            </p>
            <p className="text-white max-md:text-mSParaGraph max-md:text-center md:leading-[30px]">
              <br />
              Data failover
              <br />
              731 Route 18 South
              <br />
              East Brunswick, NJ 08816
            </p>
          </div>

         
        </div>
        <div
          className="basis-full md:basis-1/2 md:pl-[10px] md:pr-[10px]
      max-md:pl-0
      max-md:basis-2
      max-md:w-[100%]
      
      "
        >
          <form onSubmit={formik2.handleSubmit}>
            <div
              className="bg-white max-md:pb-[20px] p-[30px] md:py-[40px] md:px-[70px] flex flex-col gap-y-[25px] items-center
          
          "
            >
              <div className="flex  w-full  ">
                <TextField
                  id="filled-search"
                  label="* Name"
                  fullWidth
                  type="search"
                  variant="standard"
                  name="name"
                  onChange={formik2.handleChange}
                  value={formik2.values.name}
                  error={formik2.touched.name && Boolean(formik2.errors.name)}
                  helperText={formik2.touched.name && formik2.errors.name}
                />
              </div>
              <div className="flex w-full ">
                <TextField
                  id="filled-search"
                  label="* Email"
                  fullWidth
                  type="search"
                  variant="standard"
                  name="email"
                  onChange={formik2.handleChange}
                  value={formik2.values.email}
                  error={formik2.touched.email && Boolean(formik2.errors.email)}
                  helperText={formik2.touched.email && formik2.errors.email}
                />
              </div>
              <div className="flex w-full  ">
                <TextField
                  id="filled-search"
                  label="* Subject"
                  fullWidth
                  type="search"
                  variant="standard"
                  name="subject"
                  onChange={formik2.handleChange}
                  value={formik2.values.subject}
                  error={
                    formik2.touched.subject && Boolean(formik2.errors.subject)
                  }
                  helperText={formik2.touched.subject && formik2.errors.subject}
                />{" "}
              </div>
              <div className="flex w-full  ">
                <TextField
                  id="filled-search"
                  label="* Message"
                  fullWidth
                  type="search"
                  variant="standard"
                  name="message"
                  onChange={formik2.handleChange}
                  value={formik2.values.message}
                  error={
                    formik2.touched.message && Boolean(formik2.errors.message)
                  }
                  helperText={formik2.touched.message && formik2.errors.message}
                />{" "}
              </div>

              <div className=" flex  max-md:pl-8 max-md:pr-8 ">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LePV5wpAAAAADG88u91xMvJeP4Vzxfu2PC1vo5-"
                  onChange={handleRecaptchaVerify}
                  onExpired={handleRecaptchaExpire}
                />
              </div>

             
              <button
                className="  rounded-[30px] bg-dfyellow text-white p-2 max-md:w-[99px] md:px-5 w-40
            max-md:text-msButton max-md:py-[4px] max-md:px-[15px]
            "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div> */}
      <div className="bg-[#000000] text-white">
        <div className="flex flex-col gap-4 md:flex-row justify-between max-md:py-[20px] md:pb-10 p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto">
          <div className="basis-1/3 md:py-[40px]">
            <div className="bg-[#000000]   py-[10px] md:py-[0px] max-md:py-0 max-md:px-0">
              <div className=" flex flex-col  text-white max-md:justify-center max-md: items-center max-md:m-0 max-md:p-0">
                <div className="md:basis-1/2  w-[100%] flex justify-start md:pb-10">
                  {logofoot && (
                    <Image
                      src={logofoot}
                      className="relative md:bottom-9 mb-4 md:mb-0 max-w-[260px] md:relative top-0"
                      alt="logo"
                      width={150}
                      height={80}
                    />
                  )}
                </div>
                <p className="text-sm">
                  This site is governed solely by applicable U.S. laws and
                  governmental regulations. Please see our Privacy Policy. Use
                  of this site constitutes your consent to application of such
                  laws and regulations and to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          <div className="basis-1/3  md:px-[76px] md:py-[40px] flex flex-col">
            <h4 className="text-[22px] font-bold">Quick Links</h4>
            <ul>
              <li
                className="text-sm font-normal my-2 cursor-pointer"
                onClick={() => router.push("/plans")}
              >
                Order Now
              </li>
              <li
                className="text-sm font-normal my-2 cursor-pointer"
                onClick={() => router.push("/support")}
              >
                Support
              </li>
              <li
                className="text-sm font-normal my-2 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Account Login
              </li>
              <li className="text-sm font-normal my-2">
                <Link href="/terms#privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li className="text-sm font-normal my-2">
                <Link href="/terms#service-agreement" target="_blank">
                  Service Agreement
                </Link>
              </li>
            </ul>
          </div>
          <div className="basis-1/3  md:py-[40px] flex flex-col">
            <h4 className="text-[22px] font-bold">Contact Us</h4>
            <ul>
              <li className="text-sm font-normal my-2 flex gap-2 items-center">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 13.5C11.2583 13.5 10.5333 13.2801 9.91661 12.868C9.29993 12.456 8.81928 11.8703 8.53545 11.1851C8.25162 10.4998 8.17736 9.74584 8.32206 9.01841C8.46675 8.29098 8.8239 7.6228 9.34835 7.09835C9.8728 6.5739 10.541 6.21675 11.2684 6.07206C11.9958 5.92736 12.7498 6.00162 13.4351 6.28545C14.1203 6.56928 14.706 7.04993 15.118 7.66661C15.5301 8.2833 15.75 9.00832 15.75 9.75C15.7488 10.7442 15.3533 11.6973 14.6503 12.4003C13.9473 13.1033 12.9942 13.4988 12 13.5ZM12 7.5C11.555 7.5 11.12 7.63196 10.75 7.8792C10.38 8.12643 10.0916 8.47783 9.92127 8.88896C9.75098 9.3001 9.70642 9.7525 9.79323 10.189C9.88005 10.6254 10.0943 11.0263 10.409 11.341C10.7237 11.6557 11.1246 11.87 11.561 11.9568C11.9975 12.0436 12.4499 11.999 12.861 11.8287C13.2722 11.6584 13.6236 11.37 13.8708 11C14.118 10.63 14.25 10.195 14.25 9.75C14.2494 9.15345 14.0122 8.5815 13.5903 8.15967C13.1685 7.73784 12.5966 7.5006 12 7.5Z"
                      fill="white"
                    ></path>
                    <path
                      d="M12 22.5L5.67301 15.0382C5.58509 14.9262 5.49809 14.8135 5.41201 14.7C4.33124 13.2763 3.74739 11.5374 3.75001 9.75C3.75001 7.56196 4.6192 5.46354 6.16638 3.91637C7.71355 2.36919 9.81197 1.5 12 1.5C14.188 1.5 16.2865 2.36919 17.8336 3.91637C19.3808 5.46354 20.25 7.56196 20.25 9.75C20.2526 11.5366 19.669 13.2747 18.5888 14.6978L18.588 14.7C18.588 14.7 18.363 14.9955 18.3293 15.0353L12 22.5ZM6.60901 13.7963C6.61051 13.7963 6.78451 14.0272 6.82426 14.0767L12 20.181L17.1825 14.0685C17.2155 14.0272 17.391 13.7948 17.3918 13.794C18.2746 12.6308 18.7517 11.2103 18.75 9.75C18.75 7.95979 18.0388 6.2429 16.773 4.97703C15.5071 3.71116 13.7902 3 12 3C10.2098 3 8.49291 3.71116 7.22704 4.97703C5.96117 6.2429 5.25001 7.95979 5.25001 9.75C5.24844 11.2112 5.72609 12.6326 6.60976 13.7963H6.60901Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>
                <span className="flex flex-col">
                  9550 S. Eastern Ave, ste 253
                  <strong>Las Vegas, NV 89123-8042</strong>{" "}
                </span>
              </li>
              <li className="text-sm font-normal my-2 flex gap-2 items-center">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M5.74201 5.682C4.66901 6.594 4.27601 8.257 5.20201 9.591C6.07219 10.8422 7.15852 11.9282 8.41001 12.798C9.74401 13.724 11.407 13.331 12.319 12.258L12.329 12.263C13.4937 12.8029 14.7301 13.1723 16 13.36V16H15.996C8.02201 16.011 1.99101 9.911 2.00001 2.004V2H4.64001V2.001C4.82801 3.271 5.19801 4.507 5.73701 5.671L5.74201 5.681V5.682ZM16 18H17C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8947 17.5196 18 17.2652 18 17V12.498C18.0002 12.2581 17.9142 12.0261 17.7576 11.8444C17.601 11.6627 17.3843 11.5433 17.147 11.508L16.293 11.382C15.2127 11.2217 14.161 10.9071 13.17 10.448L12.417 10.099C12.2056 10.001 11.9665 9.98001 11.7412 10.0395C11.5159 10.0991 11.3185 10.2354 11.183 10.425L10.842 10.902C10.543 11.321 9.97201 11.448 9.55101 11.155C8.49547 10.4213 7.57914 9.50527 6.84501 8.45C6.55201 8.028 6.68001 7.457 7.09801 7.159L7.57501 6.819C7.76485 6.68348 7.90135 6.48586 7.96088 6.26033C8.02041 6.0348 7.99923 5.79556 7.90101 5.584L7.55101 4.83C7.09234 3.83895 6.77814 2.78724 6.61801 1.707L6.49101 0.853C6.45575 0.615713 6.33636 0.399009 6.15462 0.24242C5.97288 0.0858315 5.7409 -0.000206764 5.50101 3.7314e-07H1.00001C0.734794 3.7314e-07 0.48044 0.105357 0.292904 0.292894C0.105368 0.48043 1.08243e-05 0.734784 1.08243e-05 1V2.001C-0.00998918 11.008 6.91001 18.013 15.999 18H16Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>
                <a href="tel:1-800-720-9858" className="text-orange-500">
                  1-800-720-9858
                </a>
              </li>
              <li className="text-sm font-normal my-2 flex gap-2 items-center">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </span>
                <span>
                  {" "}
                  <a
                    href="mailto:info@rauchguardian.com"
                    className="text-orange-500"
                  >
                    info@rauchguardian.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
