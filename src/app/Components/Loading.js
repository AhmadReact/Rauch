"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCheck from "../hooks/useCheck";
import { fetchCompanyInfo } from "../store/thunks/CompanyThunks";

const Loading = ({ children }) => {
  const { loader } = useSelector((state) => {
    return state.loader;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanyInfo())
      .unwrap()
      .then((result) => {
        const link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        link.rel = "icon";
        link.href = result.data.logo;
        document.head.appendChild(link);
      });
  }, []);

  useCheck();

  return (
    <div className="max-md:overflow-x-hidden">
      {" "}
      {loader && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Loading;
