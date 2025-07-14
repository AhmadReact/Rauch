import {
  FaShieldAlt,
  FaHeartbeat,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBell,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaUserFriends,
  FaCalendarCheck,
} from "react-icons/fa";

const features = [
  {
    title: "24/7 – 365 Monitoring",
    icon: <FaShieldAlt className="text-indigo-600 w-6 h-6" />,
    description:
      "Emergency response is always available, offering peace of mind 365 days a year for any medical or safety emergencies.",
  },
  {
    title: "24/7 – 365 Fall Detection",
    icon: <FaHeartbeat className="text-red-500 w-6 h-6" />,
    description:
      "Automatically detects falls and alerts responders even if the help button isn’t pressed.",
  },
  {
    title: "Emergency Service Contacts",
    icon: <FaPhoneAlt className="text-green-600 w-6 h-6" />,
    description:
      "Notifies family, caretakers, or trusted contacts immediately in emergencies.",
  },
  {
    title: "24/7 – 365 Geo-Fencing",
    icon: <FaMapMarkerAlt className="text-purple-500 w-6 h-6" />,
    description:
      "Alerts when the user leaves or enters certain areas. Ideal for monitoring individuals at risk of wandering.",
  },
  {
    title: "Custom Push Notifications",
    icon: <FaBell className="text-yellow-500 w-6 h-6" />,
    description:
      "Sends real-time, customized alerts to keep users and contacts informed.",
  },
  {
    title: "Real-time GPS Tracking",
    icon: <FaMapMarkedAlt className="text-blue-500 w-6 h-6" />,
    description:
      "Live tracking via the mobile app for immediate updates on the user’s location.",
  },
  {
    title: "Rauch Guardian Home Away Mobile App",
    icon: <FaMobileAlt className="text-pink-500 w-6 h-6" />,
    description:
      "iOS app that supports notifications, live GPS tracking, and safety features in one place.",
  },
  {
    title: "Additional Care App Users",
    icon: <FaUserFriends className="text-emerald-500 w-6 h-6" />,
    description:
      "Allows up to two extra contacts to receive alerts and coordinate emergency responses.",
  },
  {
    title: "Daily Reminders and Callbacks",
    icon: <FaCalendarCheck className="text-teal-500 w-6 h-6" />,
    description:
      "Custom reminders for medications, appointments, and check-ins to support daily routines.",
  },
];

export default function FeaturesList() {
  return (
    <>
      <div className="flex flex-col justify-center py-5 items-center my-[60px]">
        <h2 className="text-[43px] font-bold">Our Key Features</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm text-center md:text-base">
          Explore the essential safety and convenience features we offer through
          our smart monitoring platform, designed to keep you and your loved
          ones connected and protected.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-[10%] mb-[5%]">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border"
          >
            <div className="flex items-center space-x-3 mb-4">
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
