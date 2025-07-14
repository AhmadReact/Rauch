import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FeaturesList from "./Components/Features";

const Features = () => {
  return (
    <div>
      <Header />
      <FeaturesList />
      <Footer />
    </div>
  );
};

export default Features;

export const metadata = {
  title: "Key Features",
  description:
    "Explore the essential safety and convenience features we offer through our smart monitoring platform, designed to keep you and your loved ones connected and protected",
  keywords: "Key Features",
  authors: [{ name: "Rauch Team" }],
  openGraph: {
    title: "Key Features",
    description: "Learn more about our company and mission.",
    url: "https://rauchguardian.com/features",
    siteName: "https://rauchguardian.com/",
    locale: "en_US",
    type: "website",
  },
};
