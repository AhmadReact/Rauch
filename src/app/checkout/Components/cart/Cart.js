import React, { Fragment, useEffect, useRef, useState } from "react";
import icon1 from "../../../assets/Group 74.png";
import icon2 from "../../../assets/Group 71.png";
import icon3 from "../../../assets/Group 492.png";
import Image from "next/image";
import { IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import {
  addToCart,
  getCartDetail,
  getCartDetailUpgrate,
  orderGroup,
  removeCoupon,
  removeFromCart,
} from "@/app/store/thunks/CartThunks";
import { Button, CircularProgress, List } from "@mui/material";
import Swal from "sweetalert2";
import { fixedDeviceSim, formated_date } from "@/app/helperData/constants";
import { MdDeleteForever } from "react-icons/md";
import { clearCart, resetCart } from "@/app/store/slices/CartSlice";
import { useRouter } from "next/navigation";
import ShipBill from "./ShipBill";
import Delivery from "./Delivery";
import { logoutUser } from "@/app/store/slices/UserSlice";
import OptionalUpgrades from "./OptionalUpgrades";
import CouponSection from "./CouponSection";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import CloseIcon from "@mui/icons-material/Close";

const Cart = ({ handleClick }) => {
  const { cart_detail, order_hash } = useSelector((state) => {
    return state.cart;
  });
  const { userInfo, isSignedIn } = useSelector((state) => {
    return state.user;
  });

  const { statetax } = useSelector((state) => {
    return state;
  });

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const removeExpress = () => {
    let data = {
      id: cart_detail?.express_shipment.id,
      hash: order_hash,
    };
    setLoader(true);
    dispatch(removeFromCart(data))
      .unwrap()
      .then(() => {
        dispatch(getCartDetail(order_hash))
          .unwrap()
          .then((result) => {
            setLoader(false);

            Swal.fire({
              title: "Overnight delivery removed!",
              text: "Overnight delivery removed from your cart.",
              icon: "info",
            });
          });
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const removeItem = (id) => {
    let promise = [];
    cart_detail.order_groups
      .filter((x) => x.id === id)[0]
      .order_groups_arr.map((order_id) => {
        let data = {
          id: order_id,
          hash: order_hash,
        };
        setLoader(true);

        promise.push(dispatch(removeFromCart(data)));
      });

    Promise.all(promise)
      .then((result) => {
        dispatch(getCartDetail(order_hash))
          .unwrap()
          .then((result) => {
            setLoader(false);
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Server Error",
          text: "Resetting your session",
          icon: "error",
        });

        dispatch(logoutUser());
      });
  };

  const removeOneWrapper = (id, planname, devicename) => {
    if (
      cart_detail.order_groups.filter((x) => x.id === id)[0].order_groups_arr
        .length == 1
    ) {
      Swal.fire({
        icon: "info",
        title: "Confirm deletion!",
        text: `Are you sure you want to remove ${planname} and ${devicename}  from your cart?`,

        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteItem(id, name);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      removeOne(id, planname, devicename);
    }
  };

  const removeOne = (id, planname, devicename) => {
    let data = {
      id: id,
      hash: order_hash,
    };
    setLoader(true);
    dispatch(removeFromCart(data))
      .then(() => {
        dispatch(getCartDetail(order_hash))
          .unwrap()
          .then((result) => {
            Swal.fire({
              title: "Item removed!",

              icon: "success",
            });

            setLoader(false);
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Server Error",
          text: "Resetting your session",
          icon: "error",
        });

        dispatch(logoutUser());
      });
  };

  const deleteItem = (id, name) => {
    let data = {
      id: cart_detail.order_groups.filter((x) => x.id === id)[0]
        .order_groups_arr[0],
      hash: order_hash,
    };
    setLoader(true);
    dispatch(removeFromCart(data))
      .then(() => {
        dispatch(getCartDetail(order_hash))
          .unwrap()
          .then((result) => {
            setLoader(false);
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Server Error",
          text: "Resetting your session",
          icon: "error",
        });

        dispatch(logoutUser());
      });
  };

  const addOne = (planid, planname, devicename, deviceid) => {
    setLoader(true);

    let tmpObj = {
      plan_id: planid,
      order_hash: order_hash,
      device_id: deviceid,
      sim_id: fixedDeviceSim.sim_id,
    };

    if (userInfo?.hash) {
      tmpObj.customer_hash = userInfo.hash;
    }

    dispatch(addToCart(tmpObj))
      .unwrap()
      .then(() => {
        dispatch(orderGroup(order_hash))
          .unwrap()
          .then(() => {
            dispatch(getCartDetail(order_hash)).then(() => {
              setLoader(false);
              Swal.fire({
                title: "Quantity increased!",
                text: `One more ${planname} and ${devicename} added to your cart.`,
                icon: "success",
              });
            });
          });
      });
  };

  const router = useRouter();
  const removeUpgradeDowngrade = () => {
    dispatch(resetCart());
    router.push("/");
  };
  console.log("cart detail ", cart_detail);

  useEffect(() => {
    if (cart_detail?.order_groups?.length == 0) {
      handleClick(0);
    }
  }, [cart_detail]);

  if (!cart_detail) {
    return <div></div>;
  }
  if (!cart_detail?.order_groups) {
    return <div></div>;
  }

  const Summary = () => {
    const summaryRef = useRef(null);

    useEffect(() => {
      const summary = summaryRef.current;
      if (summary) {
        const initialOffsetTop = summary.offsetTop;
        const specificHeight = 100; // Adjust this value to your specific height.

        const handleScroll = () => {
          const scrollY = window.scrollY + 100;

          if (scrollY >= initialOffsetTop + specificHeight) {
            summary.classList.add("sticky-summary");
          } else {
            summary.classList.remove("sticky-summary");
          }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }, []);

    const removecouponwrapper = (obj) => {
      dispatch(updateLoaderState(true));
      dispatch(removeCoupon({ coupon_code: obj, order_id: cart_detail.id }))
        .unwrap()
        .then((result) => {
          if (result.status) {
            dispatch(
              cart_detail?.type == "upgrade_downgrade"
                ? getCartDetailUpgrate(order_hash)
                : getCartDetail(order_hash)
            ).then(() => {
              dispatch(updateLoaderState(false));
              Swal.fire({
                icon: "success",
                title: "Coupon removed",
              });
            });
          } else {
            dispatch(updateLoaderState(false));
          }
        });
    };

    return (
      <div className=" border-[#868686] border px-4 py-6" ref={summaryRef}>
        {[...cart_detail?.order_groups].map((obj, index) => (
          <>
            <div className="checkout-list-group gap-x-[10px] flex items-center">
              <div style={{ flex: "1" }}>
                {obj.plan && (
                  <li class="flex justify-between  items-center">
                    <div>
                      <h6 class="my-0 font-bold text-[0.9rem]">
                        {obj.plan.name}
                      </h6>
                      {/* <small class="text-muted">Brief description</small> */}
                    </div>
                    <span class="text-muted">
                      $
                      {obj.plan_prorated_amt
                        ? obj.plan_prorated_amt
                        : obj.plan.amount_recurring.toFixed(2)}
                    </span>
                  </li>
                )}
                {obj.plan != null && obj.plan.amount_onetime != 0 && (
                  <li class="flex  justify-between  items-center">
                    <div>
                      <h6 class="my-0 font-bold text-[0.9rem]">
                        Activation fee
                      </h6>
                      {/* <small class="text-muted">Brief description</small> */}
                    </div>
                    <span class="text-muted">
                      ${obj.plan.amount_onetime.toFixed(2)}
                    </span>
                  </li>
                )}

                {obj.device && (
                  <li class="flex   justify-between items-center">
                    <div>
                      <h6 class="my-0 font-bold text-[0.9rem]">
                        {obj.device.name}
                      </h6>
                      {/* <small class="text-muted">Brief description</small> */}
                    </div>
                    <span class="text-muted">
                      $
                      {obj.plan
                        ? obj.device.amount_w_plan.toFixed(2)
                        : obj.device.amount.toFixed(2)}
                    </span>
                  </li>
                )}
              </div>
              <div>
                <span
                  style={{
                    cursor: "pointer",
                    width: "20px",
                    position: "relative",
                    bottom: 3,
                  }}
                >
                  <button
                    className="crossbtn"
                    // disabled={hold}
                    onClick={() => removeOne(obj.id)}
                  >
                    <CloseIcon className="text-[15px]" />
                  </button>
                </span>
              </div>
            </div>
            <div className="border-[#A9ABAC] border-t w-[100%] mt-10 mb-6 "></div>
          </>
        ))}

        <table width="100%" className="">
          <tbody>
            {cart_detail?.express_shipment && (
              <tr className="">
                <td>{cart_detail?.express_shipment?.device?.name}</td>
                <td className="text-right">
                  ${cart_detail?.express_shipment?.device?.amount?.toFixed(2)}{" "}
                  {/* <sup
                      title="Remove express shipping"
                      className="cursor-pointer relative left-2"
                      onClick={() =>
                        removeExpress(cart_detail?.express_shipment.id)
                      }
                    >
                      X
                    </sup> */}
                </td>
              </tr>
            )}
            <tr className="font-bold">
              <td>Sub Total</td>
              <td className="text-right">
                ${cart_detail?.subtotalPrice?.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td className="text-right">
                ${cart_detail?.shippingFee?.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td>State tax</td>
              <td className="text-right">
                ${(cart_detail?.taxes + statetax?.tax).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Plan Payment</td>
              <td className="text-right">
                ${cart_detail?.regulatory?.toFixed(2)}
              </td>
            </tr>
            {cart_detail?.couponDetails?.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>
                    Coupons{" "}
                    <div className="flex flex-col">
                      <small className="text-green-600">
                        {cart_detail?.couponDetails &&
                          cart_detail?.couponDetails.map((obj, i) => (
                            <>
                              <small key={i}>{obj.code}</small>
                              <span style={{ marginLeft: 10 }}>
                                -{obj.total}$
                              </span>
                              <span
                                style={{ marginLeft: 10, cursor: "pointer" }}
                                onClick={() => removecouponwrapper(obj.code)}
                              >
                                X
                              </span>
                              <br></br>
                            </>
                          ))}
                      </small>
                    </div>
                  </td>
                  <td className="text-right">- ${obj.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="border-[#A9ABAC] border-t w-[100%] mt-10 mb-6 "></div>
        <table className="w-[100%] ">
          <tbody>
            <tr className="font-bold">
              <td>Total</td>
              <td className="text-right">
                ${(cart_detail?.totalPrice + statetax.tax).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {loader && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div className="flex gap-x-6 max-md:flex-wrap max-md:flex-col-reverse gap-y-6">
        <div className="bg-white basis-[100%] md:basis-[70%]">
          <div>
            {/* {cart_detail?.type != "upgrade_downgrade" && (
              <Delivery removeExpress={removeExpress} />
            )} */}

            <div className="md:hidden mt-3">
              {" "}
              <Summary />
            </div>
          </div>

          {/* {isSignedIn && 
              <CouponSection/>
            } */}

          <ShipBill handleClick={handleClick} />
        </div>
        <div className=" p-5 md:p-0 w-[250px] md:w-[2px] hidden md:block  md:bg-[#A9ABAC] "></div>

        <div className="bg-white basis-[100%] md:basis-[30%] hidden md:block  ">
          <Summary />
          {/* <button className=" rounded-[30px] mt-[60px] flex items-center font-bold text-white bg-[#F77E0F] p-2 px-5 "><IoMdLock />Checkout</button> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
