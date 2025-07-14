"use client";

import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/lgogo.png";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../hooks/usePopup";
import { useRouter } from "next/navigation";
import { useAuthenticateUserMutation } from "../store/apis/API";
import { logoutUser, updateUserData } from "../store/slices/UserSlice";
import {
  customerInvoices,
  getCustomerDetail,
  getCustomerOrder,
  getUserBillingCards,
} from "../store/thunks/UserThunks";
import { fetchHashing } from "../store/thunks/CartThunks";

const CartList = () => {
  const { cart_detail } = useSelector((state) => {
    return state.cart;
  });

  const router = useRouter();

  if (!cart_detail)
    return (
      <div className="p-4">
        <h2>No Item added yet</h2>
      </div>
    );

  if (!cart_detail.order_groups)
    return (
      <div className="p-4">
        <h2>No Item added yet</h2>
      </div>
    );

  if (cart_detail.order_groups.length == 0)
    return (
      <div className="p-4">
        <h2>No Item added yet</h2>
      </div>
    );

  return (
    <div className="p-4 min-w-[300px]">
      <table width="100% ">
        <tbody>
          {cart_detail.order_groups.map((obj, i) => {
            return (
              <tr key={i}>
                <td className="flex justify-between">
                  {" "}
                  {obj.qty} ×{" "}
                  <div className="flex flex-col">
                    <span>{obj.plan.name}</span> <span>{obj?.device.name}</span>
                  </div>{" "}
                </td>
                <td></td>
                <td className="text-right">
                  ${" "}
                  {obj.plan_prorated_amt
                    ? (obj.plan_prorated_amt + obj.device.amount_w_plan) *
                      obj.qty
                    : (obj.plan.amount_recurring + obj.device.amount_w_plan) *
                      obj.qty}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Divider />
      <table width="100%">
        <tbody>
          {cart_detail?.express_shipment && (
            <tr className="">
              <td>Express Shippment</td>
              <td className="text-right">
                ${cart_detail?.express_shipment?.device?.amount}
              </td>
            </tr>
          )}
          <tr>
            <td>Sub Total</td>
            <td className="text-right">
              ${cart_detail.subtotalPrice.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td className="text-right">
              ${cart_detail.shippingFee.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>State tax</td>
            <td className="text-right">${cart_detail.taxes.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Plan Payment</td>
            <td className="text-right">${cart_detail.regulatory.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td className="text-right">${cart_detail.totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <Divider />
      <div className="text-center mt-5">
        <Link href="/plan">
          <Button variant="outlined" color="primary">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

const SignForm = ({ closeForm }) => {
  const [formobj, setformobj] = useState({
    email: "",
    password: "",
    error: "",
  });

  const dispatch = useDispatch();

  const [authenticateUser, { isLoading: isSigning }] =
    useAuthenticateUserMutation();
  const handleForm = (e) => {
    const { name, value } = e.target;
    setformobj((prev) => {
      return {
        ...prev,
        [name]: value,
        error: null,
      };
    });
  };

  const submit = () => {
    if (formobj.email == "" || formobj.password == "") {
      setformobj({ ...formobj, error: "Email or Password is empty" });
    } else {
      let signOnData = {
        identifier: formobj.email,
        password: formobj.password,
      };
      authenticateUser(signOnData)
        .then((result) => {
          if (result.error) {
            setformobj({ ...formobj, error: result.error.data.details });
          } else {
            dispatch(getCustomerOrder(result.data.id))
              .unwrap()
              .then((result) => {
                if (!result.order_hash) {
                  dispatch(fetchHashing());
                }
              });

            dispatch(getCustomerDetail(result.data.hash));
            dispatch(getUserBillingCards(result.data.id));
            dispatch(customerInvoices(result.data));
            closeForm();
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className="p-4  bg-black">
      <Box
        sx={{
          width: 300,
          height: 318,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
        className="popup"
      >
        <h5 style={{ color: "#fff" }} className="">
          Sign into your account
        </h5>

        <input
          type="text"
          placeholder="Email or Customer ID"
          className="w-[85%] h-[60px] rounded-[5px] outline-none p-[20px] text-[18px] my-[15px]"
          value={formobj.email}
          onChange={handleForm}
          name="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-[85%] h-[60px] rounded-[5px] outline-none p-[20px] text-[18px] my-[15px]"
          value={formobj.password}
          onChange={handleForm}
          name="password"
        />
        <p className="text-[#ef4444]">{formobj.error}</p>
        {/* <p style={{ color: "#fff" }}>{fieldError || servererror}</p> */}

        <button
          onClick={submit}
          className="bg-white rounded-[50px] h-[50px] w-[100px] text-[18px] "
        >
          {isSigning ? <CircularProgress /> : <span>SIGN IN</span>}
        </button>
      </Box>
    </div>
  );
};

const HeaderNew = ({
  scrollToSection,
  getStaredSection,
  technicalSpecSection,
  homeRef,
  homeScroll,
}) => {
  const [id, open, anchorEl, handleClose, handleClick] = usePopup();
  const [id2, open2, anchorEl2, handleClose2, handleClick2] = usePopup();
  const [id3, open3, anchorEl3, handleClose3, handleClick3] = usePopup();

  const { cart_detail } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo, isSignedIn } = useSelector((state) => {
    return state.user;
  });

  const [isSticky, setIsSticky] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      handleClose();
      const offset = window.scrollY;

      // You can adjust the offset value based on when you want the navbar to become sticky
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(fetchHashing());
    router.push("/");
  };

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const sections = ["section1", "section2", "section3", "section4"]; // Add more sections as needed

      // Find the first section in view
      const activeSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offset = element.offsetTop - 150;
          const height = element.offsetHeight;
          return scrollY >= offset && scrollY < offset + height;
        }
        return false;
      });

      setActiveLink(activeSection || "");
    };

    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [active, setActive] = useState("Home");

  return (
    <>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <CartList />
      </Popover>
      <Popover
        id={id3}
        open={open3}
        anchorEl={anchorEl3}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SignForm closeForm={handleClose3} />
      </Popover>

      <nav ref={homeRef} className={isSticky ? "sticky" : ""}>
        <div className="flex justify-between items-center p-6 px-[calc(5vw)]  xl:px-[calc(10vw)]">
          <div className="">
            <Link href="/">
              <Image src={logo} width={154} className="" alt="logo" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-x-[90px] mr-[15px] ">
            <div className="flex items-center gap-x-3 text-[25px] text-[#868686]">
              {isSignedIn ? (
                <>
                  <Button onClick={() => router.push("/dashboard")}>
                    Account
                  </Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <FaUser onClick={handleClick3} className="cursor-pointer" />
              )}

              <div className="w-[2px] !h-[25px] bg-[#86868689]"></div>
              <Badge
                badgeContent={cart_detail?.order_groups?.reduce(
                  (total, x) => total + x.qty,
                  0
                )}
                color="primary"
              >
                {" "}
                <FaShoppingCart
                  onClick={handleClick2}
                  className="cursor-pointer"
                />
              </Badge>
            </div>
          </div>
          <div className="md:hidden">
            <GiHamburgerMenu className="text-[25px]" onClick={handleClick} />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="flex flex-col gap-y-4  p-4">
                <div className="flex flex-col items-center gap-y-3">
                  <FaUser />
                  <Badge
                    badgeContent={cart_detail?.order_groups?.length}
                    color="primary"
                  >
                    <FaShoppingCart onClick={handleClick2} />{" "}
                  </Badge>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderNew;
