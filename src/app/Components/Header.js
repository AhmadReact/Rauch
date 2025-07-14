"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Divider,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../hooks/usePopup";
import { useRouter, usePathname } from "next/navigation";
import { useAuthenticateUserMutation } from "../store/apis/API";
import { logoutUser, updateUserData } from "../store/slices/UserSlice";
import {
  customerInvoices,
  getCustomerDetail,
  getCustomerOrder,
  getUserBillingCards,
} from "../store/thunks/UserThunks";
import {
  addToCart,
  fetchHashing,
  getCartDetail,
  orderGroup,
} from "../store/thunks/CartThunks";
import useExpressEffect from "../hooks/useExpressEffect";
import useInterCom from "../hooks/useInterCom";
import { fixedDeviceSim } from "../helperData/constants";

const CartList = ({ handleClose }) => {
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

  if (cart_detail?.type) {
    return (
      <div className="p-4 min-w-[300px]">
        <table width="100% ">
          <tbody>
            {cart_detail.order_groups.map((obj, i) => {
              return (
                <tr key={i}>
                  <td className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold">{obj.plan.name}</span>
                      <span className="text-[12px]">
                        {obj.plan.from} through {obj.plan.to}
                      </span>
                      <span className="text-[12px]">
                        then ${obj.plan.amount_recurring}/mo
                      </span>
                    </div>{" "}
                  </td>
                  <td></td>
                  <td className="text-right">$ {cart_detail.subtotalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Divider />
        <table width="100%">
          <tbody>
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
              <td className="text-right">
                ${cart_detail.regulatory.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="text-right">
                ${cart_detail.totalPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <Divider />
        <div className="text-center mt-5">
          <Link href="/checkout">
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 min-w-[300px]">
      <table width="100% ">
        <tbody>
          {cart_detail.order_groups.map((obj, i) => {
            return (
              <tr key={i}>
                <td className="flex justify-between">
                  <div className="flex flex-col">
                    <span>{obj?.plan?.name}</span>{" "}
                    <span>{obj?.device?.name}</span>
                    {obj.plan != null && obj.plan.amount_onetime != 0 && (
                      <span>Activation fee</span>
                    )}
                  </div>{" "}
                </td>
                <td></td>
                <td className="text-right flex flex-col">
                  <div>
                    $
                    {obj.plan_prorated_amt
                      ? (
                          parseFloat(obj.plan_prorated_amt) +
                          obj.device.amount_w_plan
                        ).toFixed(2)
                      : (
                          obj.plan.amount_recurring + obj?.device?.amount_w_plan
                        ).toFixed(2)}
                  </div>

                  {obj.device && (
                    <div>
                      $
                      {obj.plan
                        ? obj.device.amount_w_plan.toFixed(2)
                        : obj.device.amount.toFixed(2)}
                    </div>
                  )}

                  {obj.plan != null && (
                    <div>
                      ${" "}
                      {obj.plan.amount_onetime != 0 &&
                        obj.plan.amount_onetime.toFixed(2)}
                    </div>
                  )}
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
        <Link href="/checkout">
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
          placeholder="Email"
          className="w-[85%] h-[60px] rounded-[5px] outline-none p-[20px] text-[18px] my-[15px]"
          value={formobj.email}
          onChange={handleForm}
          name="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-[85%] h-[60px] rounded-[5px] outline-none p-[20px] text-[18px] my-[15px] mb-[5px]"
          value={formobj.password}
          onChange={handleForm}
          name="password"
        />
        <div className="w-[85%] text-right text-[13px] mb-[15px]">
          <Link href="/forgot" className="text-white">
            Forgot Password?
          </Link>
        </div>

        <p className="text-[#ef4444] mb-3">{formobj.error}</p>
        {/* <p style={{ color: "#fff" }}>{fieldError || servererror}</p> */}

        <button
          onClick={submit}
          className="bg-white rounded-[50px] h-[50px] w-[100px] text-[18px] "
        >
          {isSigning ? (
            <LinearProgress color="inherit" />
          ) : (
            <span>SIGN IN</span>
          )}
        </button>
      </Box>
    </div>
  );
};

const Header = ({
  scrollToSection,
  getStaredSection,
  technicalSpecSection,
  homeRef,
  homeScroll,
}) => {
  const [id, open, anchorEl, handleClose, handleClick] = usePopup();
  const [id2, open2, anchorEl2, handleClose2, handleClick2] = usePopup();
  const [id3, open3, anchorEl3, handleClose3, handleClick3] = usePopup();

  const { cart_detail, order_hash } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo, isSignedIn } = useSelector((state) => {
    return state.user;
  });

  const { logo } = useSelector((state) => {
    return state.company;
  });
  const [isSticky, setIsSticky] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      handleClose();
      const offset = window.scrollY;

      // You can adjust the offset value based on when you want the navbar to become sticky
      if (offset > 150) {
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
          const offset = element.offsetTop - 50;
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
  const router = useRouter();
  const pathname = usePathname();

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `/Netlink_new_-2.pdf`; // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
    downloadLink.download = "Netlink_new_-2.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleView = () => {
    window.open("/Netlink_DataSheet.pdf", "_blank"); // Open the PDF file in a new tab
  };

  useExpressEffect();

  useInterCom();
  const checkOrderHash = () => {
    return new Promise((resolve, reject) => {
      if (order_hash) {
        if (cart_detail?.type == "upgrade_downgrade") {
          reject({ message: "upgrade_downgrade" });
        }

        resolve(order_hash);
      } else {
        dispatch(fetchHashing())
          .unwrap()
          .then((result) => {
            resolve(result.order_hash);
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error in getting order hash",
            });

            reject(true);
          });
      }
    });
  };
  const addToCartWrapper = (planid) => {
    setLoader(true);
    checkOrderHash()
      .then((result) => {
        let tmpObj = {
          plan_id: planid,
          order_hash: result,
          device_id: 109,
          sim_id: fixedDeviceSim.sim_id,
        };

        if (cart_detail?.order_groups?.some((obj) => obj.plan.id == planid)) {
          tmpObj.device_id = cart_detail.order_groups.filter(
            (obj) => obj.plan.id == planid
          )[0].device.id;
        }

        // if (userInfo?.hash) {
        //   tmpObj.customer_hash = userInfo.hash;
        // }

        dispatch(addToCart(tmpObj))
          .unwrap()
          .then(() => {
            dispatch(orderGroup(result))
              .unwrap()
              .then(() => {
                // dispatch(addToCart({ device_id: 102, order_hash: order_hash }))
                //   .unwrap()
                //   .then(() => {
                //   });

                dispatch(getCartDetail(result))
                  .unwrap()
                  .then(() => {
                    setLoader(false);
                    router.push("/checkout");
                  });
              });
          });
      })
      .catch((error) => {
        setLoader(false);
        if (error?.message == "upgrade_downgrade") {
          Swal.fire({
            icon: "Error",
            title: "Upgrade downgrade scheduled",
            text: "Please checkout upgrade downgrade first.",
          });
        }
      });
  };

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
        <CartList handleClose={handleClose2} />
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
        <div className="flex justify-between items-center p-4 md:p-6 px-[calc(5vw)]  xl:px-[calc(5vw)] max-w-[1440px] mx-auto">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            {logo && (
              <Image
                src={logo}
                className="w-[100px] md:w-[154px]"
                alt="logo"
                width={154}
                height={80}
              />
            )}
          </div>
          <div className="hidden md:flex items-center gap-x-[90px] mr-[15px] ">
            <ul className="flex gap-x-[20px]  lg:gap-x-[30px] xl:gap-x-[54px] font-avenir-medium text-base text-[#092264]">
              <li
                className={`cursor-pointer hover:font-bold ${
                  pathname === "/" && "border-b-dfblue border-b-[3px] "
                }`}
                onClick={() => {
                  router.push("/"), setActive("Home");
                }}
              >
                Home
              </li>
              <li
                className={`cursor-pointer hover:font-bold ${
                  pathname === "/plans" && "border-b-dfblue border-b-[3px]"
                }`}
                onClick={() => {
                  router.push("/plans"), setActive("How");
                }}
              >
                Plans
              </li>
              {/* <li
                className={`cursor-pointer hover:font-bold ${
                  pathname === "/features" && "border-b-dfblue border-b-[3px]"
                }`}
                onClick={() => {
                  router.push("/features"), setActive("How");
                }}
              >
                Features
              </li> */}
              <li
                className={`cursor-pointer hover:font-bold ${
                  pathname === "/join_us" && "border-b-dfblue border-b-[3px]"
                }`}
                onClick={() => {
                  router.push("/join_us"), setActive("How");
                }}
              >
                Join Us
              </li>
              <li
                className={`cursor-pointer hover:font-bold ${
                  pathname === "/support" && "border-b-dfblue border-b-[3px] "
                }`}
                onClick={() => {
                  router.push("/support"), setActive("How");
                }}
              >
                Support
              </li>

              <div className="flex items-center gap-2">
                <li className="cursor-pointer hover:font-bold self-baseline">
                  <Badge
                    badgeContent={
                      cart_detail?.type
                        ? cart_detail.order_groups.length
                        : cart_detail?.order_groups?.length
                    }
                    color="primary"
                  >
                    <FaShoppingCart
                      onClick={handleClick2}
                      className="cursor-pointer fill-[#092264] text-[20px]"
                    />
                  </Badge>
                </li>
                <li className="cursor-pointer hover:font-bold">
                  {isSignedIn ? (
                    <>
                      {" "}
                      <Button
                        className="!text-dfblue"
                        onClick={() => {
                          router.push("/dashboard"), setActive("");
                        }}
                      >
                        Account
                      </Button>
                      <Button className="!text-dfblue" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <li
                      onClick={handleClick3}
                      className="font-avenir-medium cursor-pointer"
                    >
                      Login
                    </li>
                  )}
                </li>
              </div>
              {/* <li
                className={`${
                  active == "section4" && "border-b-dfblue border-b-[3px]"
                } cursor-pointer hover:font-bold`}
                onClick={handleView}
              >
                Technical Specs
              </li> */}
            </ul>
          </div>
          <div className="md:hidden flex gap-x-5">
            <div className="flex items-center gap-x-3 text-[25px] text-[#868686]">
              {isSignedIn ? (
                <>
                  <div>
                    <Button
                      className="!text-dfblue"
                      onClick={() => {
                        router.push("/dashboard"), setActive("");
                      }}
                    >
                      Account
                    </Button>
                    <Button className="!text-dfblue" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={handleClick3} className="font-avenir-medium">
                  Login
                </Button>
              )}

              <div className="w-[2px] !h-[25px] bg-[#86868689]"></div>
              <Badge
                badgeContent={
                  cart_detail?.type
                    ? cart_detail.order_groups.length
                    : cart_detail?.order_groups?.length
                }
                color="primary"
              >
                <FaShoppingCart
                  onClick={handleClick2}
                  className="cursor-pointer text-[20px] fill-[#092264]"
                />
              </Badge>
            </div>
            <div className="flex items-center">
              <GiHamburgerMenu className="text-[25px]" onClick={handleClick} />
            </div>
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
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/"), handleClose();
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/plans"), handleClose();
                  }}
                >
                  Plans
                </MenuItem>
                {/* <MenuItem
                  onClick={() => {
                    router.push("/features"), handleClose();
                  }}
                >
                  Features
                </MenuItem> */}

                <MenuItem
                  onClick={() => {
                    router.push("/join_us"), handleClose();
                  }}
                >
                  Join Us
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/support"), handleClose();
                  }}
                >
                  Support
                </MenuItem>
                {/* <MenuItem onClick={(e)=>{handleView(e),handleClose()}}>Technical Specs</MenuItem> */}
              </Menu>
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
