import dynamic from "next/dynamic";

import React from "react";
import Home from "./landing/page";
// import Home from './Landing/page'

const Index = () => {
  return (
    <>
      <Home />
    </>
  );
};

export const metadata = {
  title: "Home",
  description:
    "Stay safe & independent, with 24/7 emergency support anytime, anywhere",
  keywords: "Home,plans,index",
  authors: [{ name: "Rauch Team" }],
  openGraph: {
    title: "Home",
    description:
      "Stay safe & independent, with 24/7 emergency support anytime, anywhere.",
    url: "https://rauchguardian.com",
    siteName: "https://rauchguardian.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/public/favicon.ico",
        width: 600,
        height: 600,
      },
    ],
  },
};
export default Index;
