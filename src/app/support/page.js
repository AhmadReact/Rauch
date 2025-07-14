import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SupportPage from "../Components/Support";

export default function Page() {
  return (
    <>
      <Header />
      <SupportPage />
      <Footer one={6} two={7} three={8} />
    </>
  );
}

export const metadata = {
  title: "Support",
  description:
    "If you need assistance, please fill out the form below, and we will get back to you as soon as possible.",
  keywords: "Support",
  authors: [{ name: "Rauch Team" }],
  openGraph: {
    title: "Support",
    description: "If you need assistance, please fill out the form.",
    url: "https://rauchguardian.com/support",
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
