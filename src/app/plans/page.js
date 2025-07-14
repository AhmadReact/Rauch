import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Plans from "./Components/Plans";

const NewPlan = () => {
  return (
    <div>
      <Header />
      <Plans />

      <Footer />
    </div>
  );
};

export default NewPlan;

export const metadata = {
  title: "Plans",
  description: "Find suitable plan for you.",
  keywords: "Plans",
  authors: [{ name: "Rauch Team" }],
  openGraph: {
    title: "Plans",
    description: "Find suitable plan for you.",
    url: "https://rauchguardian.com/plans",
    siteName: "https://rauchguardian.com/",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/public/favicon.ico",
        width: 800,
        height: 600,
      },
    ],
  },
};
