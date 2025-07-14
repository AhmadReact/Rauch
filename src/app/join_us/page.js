import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import JoinUs from "./Components/JoinUs";

const Features = () => {
  return (
    <div>
      <Header />
      <JoinUs />
      <Footer />
    </div>
  );
};

export default Features;

export const metadata = {
  title: "Join us",
  description:
    "If you're interested in becoming an independent rep, we'd love to hear from you! Please fill out the contact form below, and a member of our team will get in touch with you shortly to discuss the next steps",
  keywords: "Join us",
  authors: [{ name: "Rauch Team" }],
  openGraph: {
    title: "Join us",
    description:
      "If you're interested in becoming an independent rep, we'd love to hear from you!",
    url: "https://rauchguardian.com/join_us",
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
