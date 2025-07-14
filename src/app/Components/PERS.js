"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import Image from "next/image";
import {
  addToCart,
  fetchHashing,
  getCartDetail,
  orderGroup,
} from "../store/thunks/CartThunks";
import { useDispatch, useSelector } from "react-redux";
import { fixedDeviceSim, fixedPlans } from "../helperData/constants";
import Swal from "sweetalert2";
import { useFetchPlansQuery } from "../store/apis/API";
import { useAddToCart } from "../hooks/useAddToCart";
const PERS = () => {
  const router = useRouter();

  const { data: plans, error: errorplan, isFetching } = useFetchPlansQuery();
  const lowestPlan = plans?.reduce(
    (min, plan) => (plan.amount_recurring < min.amount_recurring ? plan : min),
    plans[0]
  );

  const [selectedImage, setSelectedImage] = useState(img1);

  return (
    <>
      <div
        // style={{ backgroundImage: `url(${bg.src})` }}
        className="bg-white text-dfblue w-full flex flex-col justify-center items-center p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto"
        id="section2"
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col">
              <div className="border rounded-sm border-[black] border-1">
                <Image
                  src={selectedImage}
                  className="w-full rounded-sm"
                  alt="device"
                />
              </div>
              <div className="flex gap-1 justify-between px-5 pt-5">
                <Image
                  className={`${
                    selectedImage == img1 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img1}
                  onClick={() => setSelectedImage(img1)}
                  alt="device1"
                />
                <Image
                  className={`${
                    selectedImage == img2 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img2}
                  onClick={() => setSelectedImage(img2)}
                  alt="device2"
                />
                <Image
                  className={`${
                    selectedImage == img3 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img3}
                  onClick={() => setSelectedImage(img3)}
                  alt="device3"
                />
                <Image
                  className={`${
                    selectedImage == img4 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img4}
                  onClick={() => setSelectedImage(img4)}
                  alt="device4"
                />
                <Image
                  className={`${
                    selectedImage == img5 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img5}
                  onClick={() => setSelectedImage(img5)}
                  alt="device5"
                />
                <Image
                  className={`${
                    selectedImage == img6 &&
                    "border-blue-800 border-2 shadow-lg"
                  }   size-11 md:size-14 object-contain border cursor-pointer border-black rounded-full`}
                  src={img6}
                  onClick={() => setSelectedImage(img6)}
                  alt="device6"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-xl font-bold text-blue-900">
              Rauch Guardian - PERS
            </h2>
            <p className="text-lg text-blue-900 font-semibold">
              (Personal Emergency Response Service)
            </p>

            {/* Pricing */}
            <div className="mt-4 border-t pt-4">
              {lowestPlan?.devices?.length > 0 && (
                <p className="flex justify-between text-lg font-semibold">
                  <span>{lowestPlan?.devices[0]?.name}</span>
                  <span>${lowestPlan?.devices[0]?.amount}</span>
                </p>
              )}

              <p className="flex justify-between text-lg font-semibold">
                <span>Activation Fee</span>
                <span>${lowestPlan?.amount_onetime}</span>
              </p>

              <p className="flex justify-between text-lg font-semibold">
                <span>{lowestPlan?.name}</span>
                <span>${lowestPlan?.amount_recurring}/mo</span>
              </p>
              {/* <p className="text-sm text-gray-500">*Cancel anytime</p> */}
            </div>

            {/* Features List */}
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  ✔
                </span>{" "}
                NO hidden fees
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  ✔
                </span>{" "}
                Fall detection available
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  ✔
                </span>{" "}
                Get help anytime, anywhere
              </li>
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/plans")}
              className="mt-6 bg-blue-900 text-white py-1 rounded-3xl w-1/2 hover:bg-blue-800"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-[#c1c8d8]">
        <div className=" p-4 md:p-6 md:py-10 px-[calc(5vw)] xl:px-[calc(5vw)] max-w-[1440px] mx-auto">
          <h3 className="text-xl font-bold text-dfblue">Features</h3>
          <ul className="list-disc pl-6 text-base text-gray-900 mt-2 space-y-2 font-semibold">
            <li>
              <strong>24/7 Emergency Support:</strong> Instant access to trained
              Rauch Operator at any time, ensuring reliable help when it’s
              needed most.
            </li>
            <li>
              <strong>Advanced Fall Detection:</strong> Accurate sensors
              minimize false alarms and enable rapid response to critical
              incidents.
            </li>
            <li>
              <strong>Mobility and Independence:</strong> Protection extends
              beyond the home or workplace, providing safety and confidence
              anywhere within the continental US.
            </li>
            <li>
              <strong>Reliable Location Accuracy:</strong> GPS ensures precise
              user location for faster and more effective emergency assistance.
            </li>
            <li>
              <strong>Ease of Use:</strong> Simple, user-friendly design for
              quick and stress-free emergency activation.
            </li>
          </ul>
        </div>
      </div>
      {/* How It Works Section */}
      <div className="mt-8 text-gray-900 p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto relative">
        <h3 className="text-xl font-bold text-dfblue">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mt-4">
          <div className="flex flex-col items-center text-center w-[250px]">
            <Image
              src={img7}
              alt="Press the Button"
              className="size-[250px] object-contain bg-dfblue rounded-[30px]"
            />
            <h4 className="text-xl font-bold text-dfblue mt-2">
              Press the Button
            </h4>
            <p className="mt-3 text-sm text-left font-medium">
              In an emergency, simply press the button on your device to connect
              to a 24/7 RLSS Response Operator
            </p>
          </div>
          <div className="flex flex-col items-center text-center w-[250px]">
            <Image
              src={img8}
              alt="Connect with Responder"
              className="size-[250px] object-contain bg-dfblue rounded-[30px]"
            />
            <h4 className="text-xl font-bold text-dfblue mt-2">
              Connect with Responder
            </h4>
            <p className="mt-3 text-sm text-left font-medium">
              Our trained professional will assess the situation, provide
              support, and dispatch emergency services or contact designated
              personnel as needed
            </p>
          </div>
          <div className="flex flex-col items-center text-center w-[250px]">
            <Image
              src={img9}
              alt="Help Arrives Quickly"
              className="size-[250px] object-contain bg-dfblue rounded-[30px]"
            />
            <h4 className="text-xl font-bold text-dfblue mt-2">
              Help Arrives Quickly
            </h4>
            <p className="mt-3 text-sm text-left font-medium">
              With advanced features like fall detection and GPS location
              tracking, responders ensure timely assistance wherever you are.
            </p>
          </div>
        </div>
        <div className="hidden md:block w-[75%] h-[3px] bg-[#d4d4d4] absolute bottom-[57%] -z-10"></div>
      </div>
      <div className="bg-white w-full gap-5 flex flex-col md:flex-row justify-center items-center p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto">
        <div className="hidden md:block">
          <Image src={img10} className="w-full rounded-sm" alt="device" />
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-bold mt-5">Lightweight and Discreet:</h4>
          <p className="font-medium">
            The RLSS Monitoring Device can be worn on a belt or on a lanyard
            under clothes for easy and hidden accessibility.
          </p>
          <h4 className="text-lg font-bold mt-5">Rugged Casing:</h4>
          <p className="font-medium">
            Advanced durability for shatter resistance up to two meters and
            water submersion up to one meter for 30 minutes. (IK06 and IP67
            ratings)
          </p>
          <h4 className="text-lg font-bold mt-5">Hands-Free Voice Calls:</h4>
          <p className="font-medium">
            The device automatically calls the center when a fall is detected -
            - no need to push a button to receive help.
          </p>
        </div>
      </div>
      {/* Common Use Cases */}
      <div className="mt-8 p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto">
        <h3 className="text-xl font-bold text-dfblue px-2">Common Use Cases</h3>
        <ul className="list-disc pl-6 text-base text-gray-900 mt-2 space-y-2 font-semibold">
          <li>
            Enhanced Safety for Lone Workers (service, construction, veterans,
            real estate, in-home care takers, security guards, etc.): Provides
            immediate access to emergency support and precise
          </li>
          location tracking, ensuring help can quickly reach workers in isolated
          or high-risk environments.
          <li>
            Reliable Support for Students: Offers 24/7 emergency support and
            real-time location tracking, ensuring students feel secure on and
            off campus.
          </li>
          <li>
            Critical Support for the Medical Industry: Ensures rapid emergency
            response and continuous monitoring, enhancing patient safety and
            aiding healthcare professionals in managing urgent situations
            effectively.
          </li>
        </ul>
      </div>
      {/* Product Specifications */}
      <div className="mt-8 p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)]  max-w-[1440px] mx-auto ">
        <h3 className="text-xl font-bold text-white bg-dfblue px-2">
          Product Specifications
        </h3>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <tbody>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold">Completely Mobile</td>
              <td className="p-2">4G LTE</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold">Audio</td>
              <td className="p-2">Full duplex speaker-phone</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold">Manual Alert</td>
              <td className="p-2">Touch button activates voice call</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="p-2 font-semibold">Battery Life</td>
              <td className="p-2">48 Hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PERS;
