"use client";

import { useEffect, useRef, useState } from "react";
import Backup from "../Components/Backup";
import DontLoseBusiness from "../Components/DontLoseBusiness";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HowItWorks from "../Components/HowItWorks";
import JustOneCarrier from "../Components/JustOneCarrier";
import NetLinkCommand from "../Components/NetLinkCommand";
import NetworkMap from "../Components/NetworkMap";
import Plan from "../Components/Plan";
import SetUpBackup from "../Components/SetUpBackup";
import SimpleStep from "../Components/SimpleStep";
import TrustedBy from "../Components/TrustedBy";
import { useFetchPlansQuery } from "../store/apis/API";
import { useDispatch, useSelector } from "react-redux";
import { fetchHashing, getCartDetail } from "../store/thunks/CartThunks";
import { logoutUser } from "../store/slices/UserSlice";
import useOrderhash from "../hooks/useOrderhash";
import PlanNew from "../Components/PlanNew";
import PlanTable from "../Components/PlanTable";
import PlanTableme from "../Components/PlanTableme";
import PERS from "../Components/PERS";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling behavior
    const smoothScroll = (target) => {
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    // Handle scroll when a link is clicked
    const handleScroll = (event) => {
      event.preventDefault();

      const target = event.target.getAttribute("href").substring(1);
      smoothScroll(target);
    };

    // Add event listeners to each link
    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    // Clean up event listeners on component unmount
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  useOrderhash();

  const sectionRef = useRef(null);
  const getStartedRef = useRef(null);
  const technicalSpecRef = useRef(null);
  const homeRef = useRef(null);

  const { data: plans, error: errorplan, isFetching } = useFetchPlansQuery();

  const scrollToSection = (ref) => {
    const offset = 110; // Adjust the offset as needed
    const element = ref.current;
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <Header />
      <Backup scrollToSection={() => scrollToSection(technicalSpecRef)} />
      {/* <Plan sectionRef={getStartedRef} /> */}

      <PERS />
      {/* <PlanNew sectionRef={getStartedRef} /> */}

      {/* <PlanTable sectionRef={getStartedRef} /> */}

      {/* <PlanTableme/>
      <JustOneCarrier getStaredSection={()=>scrollToSection(getStartedRef)}/>
      <SetUpBackup  />
      <DontLoseBusiness/> */}

      {/* <TrustedBy /> */}
      {/* <HowItWorks sectionRef={sectionRef}/> */}

      <Footer one={0} two={1} three={2} />
    </div>
  );
}
