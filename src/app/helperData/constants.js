const production = true;

const fixedDeviceSim = {
  device_id: production ? 136 : 102,
  sim_id: production ? 157 : 157,
};

const fixedPlans = {
  id_1: production ? 422 : 214,
  id_2: production ? 305 : 215,
};

const express_shipment_id = production ? 122 : 107;

const netlink_5g = production ? 124 : 103;

const netlink_fortress = production ? 125 : 105;

const formated_date = (date) => {
  if (!date) {
    return;
  }
  let originalDate = date;
  let parts = originalDate.split("-");
  let formattedDate = parts[1] + "/" + parts[2] + "/" + parts[0];
  return formattedDate;
};

const reviews = [
  {
    review:
      "“Our medical practice depends on uninterrupted internet access, especially for telemedicine appointments. DataFailover’s complete backup internet has been a lifeline for us. Even during a major ISP outage, we were able to maintain patient appointments and send prescriptions to pharmacies. Highly recommended for medical offices!”",
    owner: "- Dr. Laura M., Medical Director",
  },
  {
    review:
      "“As a small business owner, internet downtime used to keep me up at night. With DataFailover, I never worry about losing crucial online connections. During a recent storm that knocked out our primary internet, this system seamlessly switched to another carrier, and we didn't miss a single customer inquiry. It's a game-changer.”",
    owner: "- Sarah D., Business Owner",
  },
  {
    review:
      "“We started using DataFailover and it's been a lifesaver. Our online operations are vital, and this service has proven itself time and again. With their support and innovative technology, we can confidently face any internet disruptions without missing a beat.”",
    owner: "- Michael P., IT Manager",
  },

  {
    review:
      "“We have 1,200 stores that need reliable internet. DataFailover is unlike anything I’ve seen in the market, switching automatically between carriers for all our locations.” ",
    owner: "- Tony T., Retail Director",
  },
  {
    review:
      "“DataFailover is a must-have for our restaurant. Online orders and payment processing continue as usual when everyone else is scrambling during outages.”",
    owner: "- Emily G., Restaurant Owner",
  },
  {
    review: "“It works seamlessly. I’m very happy with DataFailover.”",
    owner: "- Ravi P., Call Center Supervisor",
  },
  {
    review:
      "“As a retail outlet, internet downtime is not an option. DataFailover has saved us multiple times, preventing those awkward moments when our cashiers stand around avoiding eye contact with customers waiting to check out.”",
    owner: "- Malik J., Store Manager",
  },
  {
    review:
      "“Easy to set up and works by itself. It already kicked in twice this month when other businesses on our street were stuck without connection.”",
    owner: "- Sofia M., Coffee Shop Owner",
  },
  {
    review:
      "“I wish we had this sooner. We’ve lost embarrassing amounts of money when outages meant thousands of employees couldn’t do their jobs. Very grateful for this new technology and the team at DataFailover.”",
    owner: "- Alessandro G., Technology V.P.",
  },
];

const Mycheckbox = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 28.106 28.106"
    >
      <rect
        id="Rectangle_125"
        data-name="Rectangle 125"
        width="27.106"
        height="27.106"
        transform="translate(0.5 0.5)"
        fill="#fff"
        stroke="#868686"
        strokeMiterlimit="10"
        strokeWidth="1"
      />
    </svg>
  );
};

const Mycheckboxchecked = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 28.106 28.106"
    >
      <g
        id="Component_1_1"
        data-name="Component 1 – 1"
        transform="translate(0.5 0.5)"
      >
        <rect
          id="Rectangle_125"
          data-name="Rectangle 125"
          width="27.106"
          height="27.106"
          fill="#fff"
          stroke="#868686"
          strokeMiterlimit="10"
          strokeWidth="1"
        />
        <rect
          id="Rectangle_126"
          data-name="Rectangle 126"
          width="12.613"
          height="12.613"
          transform="translate(7.246 7.246)"
          fill="#A9ABAC"
        />
      </g>
    </svg>
  );
};

const Mytooltip = () => {
  return (
    <svg
      className="relative left-2"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="15"
      height="15"
      viewBox="0 0 512 512"
    >
      <path
        fill="#f77e0f"
        d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
      ></path>
      <path
        fill="#FFF"
        d="M323.2 367.5c-1.4-2-4-2.8-6.3-1.7-24.6 11.6-52.5 23.9-58 25-.1-.1-.4-.3-.6-.7-.7-1-1.1-2.3-1.1-4 0-13.9 10.5-56.2 31.2-125.7 17.5-58.4 19.5-70.5 19.5-74.5 0-6.2-2.4-11.4-6.9-15.1-4.3-3.5-10.2-5.3-17.7-5.3-12.5 0-26.9 4.7-44.1 14.5-16.7 9.4-35.4 25.4-55.4 47.5-1.6 1.7-1.7 4.3-.4 6.2 1.3 1.9 3.8 2.6 6 1.8 7-2.9 42.4-17.4 47.6-20.6 4.2-2.6 7.9-4 10.9-4 .1 0 .2 0 .3 0 0 .2.1.5.1.9 0 3-.6 6.7-1.9 10.7-30.1 97.6-44.8 157.5-44.8 183 0 9 2.5 16.2 7.4 21.5 5 5.4 11.8 8.1 20.1 8.1 8.9 0 19.7-3.7 33.1-11.4 12.9-7.4 32.7-23.7 60.4-49.7C324.3 372.2 324.6 369.5 323.2 367.5zM322.2 84.6c-4.9-5-11.2-7.6-18.7-7.6-9.3 0-17.5 3.7-24.2 11-6.6 7.2-9.9 15.9-9.9 26.1 0 8 2.5 14.7 7.3 19.8 4.9 5.2 11.1 7.8 18.5 7.8 9 0 17-3.9 24-11.6 6.9-7.6 10.4-16.4 10.4-26.4C329.6 96 327.1 89.6 322.2 84.6z"
      ></path>
    </svg>
  );
};

const Mycircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41.659"
      height="41.659"
      viewBox="0 0 41.659 41.659"
    >
      <g
        id="Group_39"
        data-name="Group 39"
        transform="translate(-315.257 -10989.141)"
      >
        <circle
          id="Ellipse_10"
          data-name="Ellipse 10"
          cx="20.329"
          cy="20.329"
          r="20.329"
          transform="translate(315.757 10989.641)"
          fill="none"
          stroke="#868686"
          strokeMiterlimit="10"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

const Mycirclefilled = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41.659"
      height="41.659"
      viewBox="0 0 41.659 41.659"
    >
      <g
        id="Group_217"
        data-name="Group 217"
        transform="translate(-2309.969 -4271.981)"
      >
        <circle
          id="Ellipse_61"
          data-name="Ellipse 61"
          cx="20.329"
          cy="20.329"
          r="20.329"
          transform="translate(2310.469 4272.481)"
          fill="none"
          stroke="#868686"
          strokeMiterlimit="10"
          strokeWidth="1"
        />
        <circle
          id="Ellipse_62"
          data-name="Ellipse 62"
          cx="12.591"
          cy="12.591"
          r="12.591"
          transform="translate(2318.207 4280.219)"
          fill="#f77e0f"
        />
      </g>
    </svg>
  );
};
export {
  Mycirclefilled,
  Mycircle,
  netlink_5g,
  netlink_fortress,
  fixedDeviceSim,
  fixedPlans,
  express_shipment_id,
  formated_date,
  reviews,
  Mycheckbox,
  Mycheckboxchecked,
  Mytooltip,
};
