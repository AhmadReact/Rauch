import {
  useCheckEmailMutation,
  useGenerateInvoiceMutation,
} from "@/app/store/apis/API";
import {
  chargeCard,
  createSubscription,
  createUser,
  getCustomerDetail,
  getCustomerTax,
  getUserBillingCards,
  updateCustomerInfo,
  updateSubscription,
} from "@/app/store/thunks/UserThunks";
import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import states from "../../../helperData/states.json";
import { loginUser, updateEnableAutoPay } from "@/app/store/slices/UserSlice";
import { clearCart, updateCart } from "@/app/store/slices/CartSlice";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import {
  createDeviceRecord,
  getCartDetail,
  getCartDetailUpgrate,
} from "@/app/store/thunks/CartThunks";
import useExpressEffect from "@/app/hooks/useExpressEffect";
import { updateLoaderState } from "@/app/store/slices/LoaderSlice";
import { Mycheckbox, Mycheckboxchecked } from "@/app/helperData/constants";
import CouponSection from "./CouponSection";
import { createSubscriptionAddon } from "@/app/services/services";
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000 0000 0000 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MMYY = React.forwardRef(function MMYY(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

MMYY.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ShipBill = ({ handleClick }) => {
  const { userInfo, isSignedIn, billingCards } = useSelector((state) => {
    return state.user;
  });

  const [selectedCard, setSelectedCard] = useState(
    billingCards?.length > 0
      ? billingCards.some((obj) => obj.is_primary)
        ? billingCards.filter((obj) => obj.is_primary)[0].id
        : billingCards[0].id
      : "customer_card"
  );

  const { order_hash, cart_detail } = useSelector((state) => {
    return state.cart;
  });

  const { tax } = useSelector((state) => {
    return state.statetax;
  });
  const [billShip, setBillShip] = useState(false);
  const [loader, setLoader] = useState(false);
  const [generateInvoice, isFetching] = useGenerateInvoiceMutation();
  const [enableAutopay, setenableAutopay] = useState(userInfo?.auto_pay);
  const dispatch = useDispatch();
  const [agreement, setagreement] = useState(false);
  const paymentRef = useRef(null);
  const router = useRouter();
  const handleBillShip = () => {
    if (billShip) {
      setBillShip(false);
    } else {
      formik2.setValues({
        billing_fname: formik.values.shipping_fname,
        billing_lname: formik.values.shipping_lname,
        billing_address1: formik.values.shipping_address1,
        billing_address2: formik.values.shipping_address2,
        billing_city: formik.values.shipping_city,
        billing_state_id: formik.values.shipping_state_id,
        billing_zip: formik.values.shipping_zip,
        billing_phone: formik.values.phone,
      });

      setBillShip(true);
    }
  };

  useEffect(() => {
    formik.setValues({
      fname: userInfo?.fname ? userInfo.fname : "",
      lname: userInfo?.lname ? userInfo.lname : "",
      shipping_fname: userInfo?.shipping_fname ? userInfo.shipping_fname : "",
      shipping_lname: userInfo?.shipping_lname ? userInfo.shipping_lname : "",
      shipping_address1: userInfo?.shipping_address1
        ? userInfo.shipping_address1
        : "",
      shipping_address2: userInfo?.shipping_address2
        ? userInfo.shipping_address2
        : "",
      shipping_city: userInfo?.shipping_city ? userInfo.shipping_city : "",
      shipping_state_id: userInfo?.shipping_state_id
        ? userInfo.shipping_state_id
        : "",
      shipping_zip: userInfo?.shipping_zip ? userInfo.shipping_zip : "",
      email: userInfo?.email ? userInfo.email : "",
      phone: userInfo?.phone ? userInfo.phone : "",
      company_name: "",
      password: "",
      confirmpass: "",
      pin: "",
    });

    formik2.setValues({
      billing_state_id: userInfo?.billing_state_id
        ? userInfo.billing_state_id
        : "",
      billing_fname: userInfo?.billing_fname ? userInfo.billing_fname : "",
      billing_lname: userInfo?.billing_lname ? userInfo.billing_lname : "",
      billing_address1: userInfo?.billing_address1
        ? userInfo.billing_address1
        : "",
      billing_address2: userInfo?.billing_address2
        ? userInfo.billing_address2
        : "",
      billing_city: userInfo?.billing_city ? userInfo.billing_city : "",
      billing_zip: userInfo?.billing_zip ? userInfo.billing_zip : "",
    });
  }, [userInfo]);

  const checkTaxes = (flag) => {
    return new Promise((resolve, reject) => {
      if (flag) {
        dispatch(getCustomerTax(formik2.values.billing_state_id))
          .unwrap()
          .then((result) => {
            let calculatedtax = 0;
            if (cart_detail.express_shipment.device.taxable) {
              calculatedtax =
                cart_detail.express_shipment.device.amount *
                (result.tax_rate / 100);
            }

            resolve(calculatedtax);
          });
      } else {
        resolve(0);
      }
    });
  };

  const createAccount = () => {
    setLoader(true);
    dispatch(createUser({ ...formik.values, order_hash: order_hash }))
      .unwrap()
      .then((result) => {
        if (result.details || result.error) {
          setLoader(false);
          Swal.fire({
            title: "Validation Error",
            text: result.error,
            icon: "error",
          });
          return;
        }

        dispatch(
          createUser({
            ...formik2.values,
            id: result.customer.id,
            order_hash: order_hash,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(
              createUser({
                customer_id: result.customer.id,
                order_hash: order_hash,
              })
            )
              .unwrap()
              .then(() => {
                setLoader(false);
                dispatch(getCartDetail(order_hash));
                dispatch(getCustomerDetail(result.customer.hash))
                  .unwrap()
                  .then(() => {
                    const sectionPosition =
                      paymentRef.current.getBoundingClientRect().top +
                      window.pageYOffset;
                    Swal.fire({
                      title: "Success ",
                      text: "Account created. You are now logged in.",
                      icon: "success",
                      didClose: () =>
                        window.scrollTo({
                          top: sectionPosition - 150, // Adjust by 50 pixels down
                          behavior: "smooth",
                        }),
                    });
                  });
              });
          });
      })
      .catch(() => {
        setLoader(false);
        Swal.fire({
          title: "Server Error ",
          text: "Something went wrong",
          icon: "error",
        });
      });
  };

  const checkout = () => {
    const dynamicPromises = [];

    setLoader(true);
    dispatch(createUser({ ...formik.values, order_hash: order_hash }))
      .unwrap()
      .then((result) => {
        if (result.details || result.error) {
          setLoader(false);
          Swal.fire({
            title: "Validation Error",
            text: result.error,
            icon: "error",
          });
          return;
        }

        dispatch(
          createUser({
            ...formik2.values,
            id: result.customer.id,
            order_hash: order_hash,
          })
        )
          .unwrap()
          .then(() => {
            dispatch(
              createUser({
                customer_id: result.customer.id,
                order_hash: order_hash,
              })
            )
              .unwrap()
              .then(() => {
                dispatch(getCustomerDetail(result.customer.hash));

                dispatch(getCartDetail(order_hash))
                  .unwrap()
                  .then((order_detail) => {
                    checkTaxes(cart_detail?.express_shipment ? 1 : 0).then(
                      (itax) => {
                        dispatch(
                          chargeCard({
                            ...formik2.values,
                            ...formik3.values,
                            customer_card: selectedCard,
                            order_hash: order_hash,
                            amount:
                              parseFloat(order_detail.totalPrice) +
                              parseFloat(itax),
                            customer_id: result.customer.id,
                          })
                        )
                          .unwrap()
                          .then((result2) => {
                            if (result2.success) {
                              if (selectedCard == "customer_card") {
                                dispatch(
                                  getUserBillingCards(result.customer.id)
                                );
                              }

                              cart_detail.order_groups.map((obj) => {
                                dynamicPromises.push(
                                  dispatch(
                                    createSubscription({
                                      order_id: cart_detail.id,
                                      plan_id: obj.plan.id,
                                      device_id: obj.device.id,
                                      sim_id: obj.sim.id,
                                      api_key: process.env.NEXT_PUBLIC_API_KEY,
                                      coupon_data: JSON.stringify(
                                        produceCoupon(obj.id)
                                      ),
                                    })
                                  ).unwrap()
                                );
                              });

                              if (cart_detail.express_shipment) {
                                dynamicPromises.push(
                                  dispatch(
                                    createDeviceRecord({
                                      device_id:
                                        cart_detail.express_shipment.device.id,
                                      order_id: cart_detail.id,
                                      customer_id: result.customer.id,
                                      coupon_data: JSON.stringify(
                                        produceCoupon(
                                          cart_detail.express_shipment.id
                                        )
                                      ),
                                    })
                                  ).unwrap()
                                );
                              }
                              dispatch(
                                updateCustomerInfo({
                                  auto_pay: enableAutopay ? 1 : 0,
                                  id: result.customer.id,
                                  hash: result.customer.hash,
                                })
                              )
                                .unwrap()
                                .then(() => {
                                  dispatch(
                                    updateEnableAutoPay(enableAutopay ? 1 : 0)
                                  );
                                });

                              Promise.all(dynamicPromises)
                                .then((result) => {
                                  setLoader(false);

                                  generateInvoice({
                                    data_to_invoice: {
                                      subscription_id:
                                        result.filter(
                                          (obj) => obj.subscription_id
                                        ).length > 0
                                          ? result
                                              .filter(
                                                (obj) => obj.subscription_id
                                              )
                                              .map((obj) => obj.subscription_id)
                                          : null,
                                      subscription_addon_id: [],
                                      customer_standalone_device_id:
                                        result.filter((obj) => obj.device_id)
                                          .length > 0
                                          ? result
                                              .filter((obj) => obj.device_id)
                                              .map((obj) => obj.device_id)
                                          : null,
                                      same_subscription_id: [],
                                    },
                                    customer_id: userInfo?.id,
                                    hash: order_hash,
                                    coupon: JSON.stringify(
                                      cart_detail.couponDetails
                                    ),
                                    auto_generated_order: 0,
                                  })
                                    .then((result) => {
                                      dispatch(clearCart());
                                      dispatch(
                                        updateCart({
                                          name: "order_num",
                                          value: result.data.order_num,
                                        })
                                      );
                                      dispatch(
                                        updateCart({
                                          name: "invoice_hash",
                                          value: order_hash,
                                        })
                                      );
                                      handleClick(2);
                                    })
                                    .catch(() => {});
                                })
                                .catch((error) => {
                                  Swal.fire({
                                    title: "Dynamic Promises ",
                                    text: "Error in dynamic promises",
                                    icon: "error",
                                  });
                                  setLoader(false);
                                });
                            } else {
                              Swal.fire({
                                title: "Billing Error",
                                text: "Error payment processing",
                                icon: "error",
                              });
                              setLoader(false);
                            }
                          })
                          .catch(() => {
                            setLoader(false);
                          });
                      }
                    );
                  });
              });
          })
          .catch(() => {
            setLoader(false);
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Server error",
          text: "Error creating account",
          icon: "error",
        });
        setLoader(false);
      });
  };

  const checkout2 = () => {
    const dynamicPromises = [];

    setLoader(true);

    dispatch(createUser({ customer_id: userInfo?.id, order_hash: order_hash }))
      .unwrap()
      .then((result) => {
        // getCartDetailUpgrate;

        let entries = Object.entries(formik.values);

        // Filter entries for keys containing "shipping"
        let filteredEntries = entries.filter(([key, value]) =>
          key.includes("shipping")
        );

        // Create object from filtered entries
        let filteredObject = Object.fromEntries(filteredEntries);

        dispatch(
          cart_detail.hasOwnProperty("type")
            ? getCartDetailUpgrate(order_hash)
            : getCartDetail(order_hash)
        )
          .unwrap()
          .then((order_detail) => {
            dispatch(
              chargeCard({
                ...formik2.values,
                ...formik3.values,
                customer_card: selectedCard,
                order_hash: order_hash,
                amount: parseFloat(order_detail.totalPrice) + parseFloat(tax),
                customer_id: userInfo?.id,
              })
            )
              .unwrap()
              .then((result) => {
                if (result.success) {
                  if (selectedCard == "customer_card") {
                    dispatch(getUserBillingCards(userInfo?.id));
                  }

                  if (cart_detail.hasOwnProperty("type")) {
                    cart_detail.order_groups.map((obj) => {
                      dynamicPromises.push(
                        obj?.status == "Downgrade"
                          ? dispatch(
                              updateSubscription({
                                order_hash: order_hash,
                                id: obj?.subscription?.id,
                                new_plan_id: obj?.plan?.id,
                                upgrade_downgrade_status: "downgrade-scheduled",
                                order_group: obj?.id,
                              })
                            ).unwrap()
                          : obj?.status == "SamePlan"
                          ? dispatch(
                              updateSubscription({
                                order_hash: order_hash,
                                id: obj?.subscription?.id,
                                new_plan_id: obj?.plan?.id,
                                upgrade_downgrade_status: "sameplan",
                                order_group: obj?.id,
                              })
                            ).unwrap()
                          : dispatch(
                              createSubscription({
                                order_id: cart_detail?.id,
                                plan_id: obj?.plan?.id,
                                device_id: obj?.device?.id,
                                sim_id: obj?.sim?.id,
                                api_key: process.env.NEXT_PUBLIC_API_KEY,
                                status: obj?.status,
                                subscription: obj?.subscription,
                                coupon_data: JSON.stringify(
                                  produceCoupon(obj.id)
                                ),
                              })
                            ).unwrap()
                      );
                    });
                  } else {
                    cart_detail.order_groups.map((obj) => {
                      dynamicPromises.push(
                        obj?.status == "Downgrade"
                          ? dispatch(
                              updateSubscription({
                                order_hash: order_hash,
                                id: obj?.subscription?.id,
                                new_plan_id: obj?.plan?.id,
                                upgrade_downgrade_status: "downgrade-scheduled",
                                order_group: obj?.id,
                              })
                            ).unwrap()
                          : dispatch(
                              createSubscription({
                                order_id: cart_detail?.id,
                                plan_id: obj?.plan?.id,
                                device_id: obj?.device?.id,
                                sim_id: obj?.sim?.id,
                                api_key: process.env.NEXT_PUBLIC_API_KEY,
                                status: obj?.status,
                                subscription: obj?.subscription,
                                coupon_data: JSON.stringify(
                                  produceCoupon(obj.id)
                                ),
                              })
                            ).unwrap()
                      );
                    });
                  }

                  if (cart_detail?.express_shipment) {
                    dynamicPromises.push(
                      dispatch(
                        createDeviceRecord({
                          device_id: cart_detail.express_shipment.device.id,
                          order_id: cart_detail.id,
                          customer_id: userInfo?.id,
                          coupon_data: JSON.stringify(
                            produceCoupon(cart_detail.express_shipment.id)
                          ),
                        })
                      ).unwrap()
                    );
                  }

                  Promise.all(dynamicPromises).then((result) => {
                    if (userInfo.auto_pay != enableAutopay) {
                      dispatch(
                        updateCustomerInfo({
                          auto_pay: enableAutopay ? 1 : 0,
                          id: userInfo.id,
                          hash: userInfo.hash,
                        })
                      )
                        .unwrap()
                        .then(() => {
                          dispatch(updateEnableAutoPay(enableAutopay ? 1 : 0));
                        });
                    }
                    if (cart_detail.order_groups[0].status == "Upgrade") {
                      const dynamicPromises2 = [];

                      cart_detail.order_groups[0].addons.map((obj) => {
                        dynamicPromises2.push(
                          createSubscriptionAddon({
                            subscription_id: result[0].subscription_id
                              ? result[0].subscription_id
                              : result[0].same_subscription_id,
                            addon_id: obj.id,
                            subscription_addon_id: obj.subscription_addon_id,
                            addon_subscription_id: obj.subscription_addon_id,
                            plan_id: cart_detail.order_groups[0].plan.id,
                            order_id: cart_detail.id,
                          })
                        );
                      });

                      Promise.all(dynamicPromises2).then((result2) => {
                        generateInvoice({
                          data_to_invoice: {
                            subscription_id:
                              result.filter((obj) => obj.subscription_id)
                                .length > 0
                                ? result
                                    .filter((obj) => obj.subscription_id)
                                    .map((obj) => obj.subscription_id)
                                : null,
                            subscription_addon_id: result2.map(
                              (obj) => obj.subscription_addon_id
                            ),
                            customer_standalone_device_id:
                              result.filter((obj) => obj.device_id).length > 0
                                ? result
                                    .filter((obj) => obj.device_id)
                                    .map((obj) => obj.device_id)
                                : null,
                            same_subscription_id: result
                              .filter((obj) => obj.same_subscription_id)
                              .map((obj) => obj.same_subscription_id),
                          },
                          customer_id: userInfo?.id,
                          hash: order_hash,
                          coupon: JSON.stringify(cart_detail?.couponDetails),
                          auto_generated_order:
                            cart_detail?.paid_monthly_invoice,
                        })
                          .then((result3) => {
                            setLoader(false);
                            dispatch(clearCart());
                            dispatch(
                              updateCart({
                                name: "order_num",
                                value: result3.data.order_num,
                              })
                            );
                            dispatch(
                              updateCart({
                                name: "invoice_hash",
                                value: order_hash,
                              })
                            );

                            handleClick(2);
                          })
                          .catch(() => {
                            console.log("Hello here is error");
                          });
                      });
                    } else {
                      generateInvoice(
                        cart_detail.order_groups[0].status == "Downgrade"
                          ? {
                              type: "downgrade-scheduled",
                              customer_id: userInfo?.id,
                              order_hash: order_hash,
                              status: "Without Payment",
                              order_groups: cart_detail.order_groups,
                            }
                          : cart_detail.order_groups[0].status == "SamePlan"
                          ? {
                              type: "sameplan",
                              customer_id: userInfo?.id,
                              order_hash: order_hash,
                              status: "Without Payment",
                              order_groups: cart_detail.order_groups,
                            }
                          : cart_detail.order_groups[0].status == "Upgrade"
                          ? {
                              data_to_invoice: {
                                subscription_id:
                                  result.filter((obj) => obj.subscription_id)
                                    .length > 0
                                    ? result
                                        .filter((obj) => obj.subscription_id)
                                        .map((obj) => obj.subscription_id)
                                    : null,
                                subscription_addon_id: [],
                                customer_standalone_device_id:
                                  result.filter((obj) => obj.device_id).length >
                                  0
                                    ? result
                                        .filter((obj) => obj.device_id)
                                        .map((obj) => obj.device_id)
                                    : null,
                                same_subscription_id: [],
                              },
                              customer_id: userInfo?.id,
                              hash: order_hash,
                              coupon: JSON.stringify(
                                cart_detail?.couponDetails
                              ),
                              auto_generated_order:
                                cart_detail?.paid_monthly_invoice,
                            }
                          : {
                              data_to_invoice: {
                                subscription_id:
                                  result.filter((obj) => obj.subscription_id)
                                    .length > 0
                                    ? result
                                        .filter((obj) => obj.subscription_id)
                                        .map((obj) => obj.subscription_id)
                                    : null,
                                subscription_addon_id: [],
                                customer_standalone_device_id:
                                  result.filter((obj) => obj.device_id).length >
                                  0
                                    ? result
                                        .filter((obj) => obj.device_id)
                                        .map((obj) => obj.device_id)
                                    : null,
                                same_subscription_id: result
                                  .filter((obj) => obj.same_subscription_id)
                                  .map((obj) => obj.same_subscription_id),
                              },
                              customer_id: userInfo?.id,
                              hash: order_hash,
                              coupon: JSON.stringify(
                                cart_detail?.couponDetails
                              ),
                              auto_generated_order:
                                cart_detail?.paid_monthly_invoice,
                            }
                      )
                        .then((result) => {
                          setLoader(false);
                          dispatch(clearCart());
                          dispatch(
                            updateCart({
                              name: "order_num",
                              value: result.data.order_num,
                            })
                          );
                          dispatch(
                            updateCart({
                              name: "invoice_hash",
                              value: order_hash,
                            })
                          );

                          handleClick(2);
                        })
                        .catch(() => {
                          setLoader(false);
                          // router.push("/");
                          Swal.fire({
                            title: "Invoice Error",
                            text: "Failed to generate invoice. Please try again.",
                            icon: "error",
                          });
                        });
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Error processing payment",
                    text: `${result.message}`,
                    icon: "error",
                  });
                  setLoader(false);
                }
              })
              .catch(() => {
                Swal.fire({
                  title: "Billing Error",
                  text: "Error processing payment",
                  icon: "error",
                });

                setLoader(false);
              });
          });
      })
      .catch(() => {
        Swal.fire({
          title: "Server Error",
          text: "Error in user account",
          icon: "error",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      fname: userInfo?.fname ? userInfo.fname : "",
      lname: userInfo?.lname ? userInfo.lname : "",
      shipping_fname: userInfo?.shipping_fname ? userInfo.shipping_fname : "",
      shipping_lname: userInfo?.shipping_lname ? userInfo.shipping_lname : "",
      shipping_address1: userInfo?.shipping_address1
        ? userInfo.shipping_address1
        : "",
      shipping_address2: userInfo?.shipping_address2
        ? userInfo.shipping_address2
        : "",
      shipping_city: userInfo?.shipping_city ? userInfo.shipping_city : "",
      shipping_state_id: userInfo?.shipping_state_id
        ? userInfo.shipping_state_id
        : "",
      shipping_zip: userInfo?.shipping_zip ? userInfo.shipping_zip : "",
      email: userInfo?.email ? userInfo.email : "",
      phone: userInfo?.phone ? userInfo.phone : "",
      company_name: "",
      password: "",
      confirmpass: "",
      pin: "",
    },
    onSubmit: (values) => {
      // Handle form submission

      if (Object.keys(formik.errors).length > 0) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill the mandatory fields",
          icon: "error",
        });
        return;
      } else {
        formik2.handleSubmit();
      }
      // isSignedIn?checkout2():checkout()
    },
    validate: (values) => {
      const errors = {};
      var zipRegex = /^(?:(\d{5})(?:[ \-](\d{4}))?)$/i;
      // Perform validation logic for each field

      if (!values.shipping_fname) {
        errors.shipping_fname = "Shipping first name is required";
      }
      if (!values.shipping_lname) {
        errors.shipping_lname = "Shipping last name is required";
      }
      if (!values.shipping_address1) {
        errors.shipping_address1 = "Shipping address 1 is required";
      }
      if (!values.shipping_city) {
        errors.shipping_city = "Shipping city is required";
      }
      if (!values.shipping_state_id) {
        errors.shipping_state_id = "Shipping state is required";
      }

      if (!values.phone) {
        errors.phone = "Phone is required";
      }
      if (!isSignedIn) {
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password atleast 6 characters long";
        }
        if (!values.confirmpass) {
          errors.confirmpass = "Confirm password is required";
        } else if (values.confirmpass != values.password) {
          errors.confirmpass = "Confirm password mismatch";
        }
        if (!values.pin) {
          errors.pin = "Pin is required";
        } else if (values.pin.length != 4) {
          errors.pin = "Pin must be 4 digit long";
        }

        if (!values.fname) {
          errors.fname = "First name is required";
        }
        if (!values.lname) {
          errors.lname = "Last name is required";
        }

        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !String(values.email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          errors.email = "Enter valid email";
        } else {
          if (formik.errors.email) {
            errors.email = "This email already exists";
          }

          if (formik?.errors?.email) {
            checkEmail(values.email).then((result) => {
              if (result.data.emailCount > 0) {
                formik.setFieldError("email", "This email already exists");
              } else {
                formik.setFieldError("email", false);
              }
            });
          }
        }
      }

      if (!values.shipping_zip) {
        errors.shipping_zip = "Shipping zipcode is required";
      } else if (!zipRegex.test(values.shipping_zip)) {
        errors.shipping_zip = "Enter valid zipcode";
      }

      // Add validation logic for other fields

      return errors;
    },
  });

  const formik2 = useFormik({
    initialValues: {
      billing_state_id: userInfo?.billing_state_id
        ? userInfo.billing_state_id
        : "",
      billing_fname: userInfo?.billing_fname ? userInfo.billing_fname : "",
      billing_lname: userInfo?.billing_lname ? userInfo.billing_lname : "",
      billing_address1: userInfo?.billing_address1
        ? userInfo.billing_address1
        : "",
      billing_address2: userInfo?.billing_address2
        ? userInfo.billing_address2
        : "",
      billing_city: userInfo?.billing_city ? userInfo.billing_city : "",
      billing_zip: userInfo?.billing_zip ? userInfo.billing_zip : "",
    },
    onSubmit: (values) => {
      if (Object.keys(formik2.errors).length > 0) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill the mandatory fields",
          icon: "error",
        });
        return;
      } else {
        if (!isSignedIn) {
          createAccount();
        } else {
          let entries = Object.entries(formik.values);

          // Filter entries for keys containing "shipping"
          let filteredEntries = entries.filter(([key, value]) =>
            key.includes("shipping")
          );

          // Create object from filtered entries
          let filteredObject = Object.fromEntries(filteredEntries);

          dispatch(updateLoaderState(true));
          dispatch(
            updateCustomerInfo({
              id: userInfo?.id,
              hash: userInfo?.hash,
              ...filteredObject,
              ...formik2.values,
            })
          )
            .then((result) => {
              dispatch(updateLoaderState(false));
              const sectionPosition =
                paymentRef.current.getBoundingClientRect().top +
                window.pageYOffset;
              Swal.fire({
                title: "Success",
                text: "Information updated",
                icon: "success",
                didClose: () =>
                  window.scrollTo({
                    top: sectionPosition - 150, // Adjust by 50 pixels down
                    behavior: "smooth",
                  }),
              });

              dispatch(getCartDetail(order_hash));
              dispatch(getCustomerDetail(userInfo.hash));
            })
            .catch(() => {
              dispatch(updateLoaderState(false));
              Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
              });
            });
        }

        // if (selectedCard != "customer_card") {
        //   isSignedIn ? checkout2() : checkout();
        // } else {
        //   formik3.handleSubmit();
        // }
      }
    },
    validate: (values) => {
      const errors = {};
      var zipRegex = /^(?:(\d{5})(?:[ \-](\d{4}))?)$/i;
      // Perform validation logic for each field
      if (!values.billing_fname) {
        errors.billing_fname = "First name is required";
      }
      if (!values.billing_lname) {
        errors.billing_lname = "Last name is required";
      }
      if (!values.billing_address1) {
        errors.billing_address1 = "Billing Address 1 is required";
      }
      if (!values.billing_city) {
        errors.billing_city = "Billing city is required";
      }
      if (!values.billing_state_id) {
        errors.billing_state_id = "Billing state is required";
      }
      if (!values.billing_zip) {
        errors.billing_zip = "Billing zipcode is required";
      } else if (!zipRegex.test(values.billing_zip)) {
        errors.billing_zip = "Enter valid zipcode";
      }

      // Add validation logic for other fields

      return errors;
    },
  });

  const formik3 = useFormik({
    initialValues: {
      payment_card_no: "",
      expires_mmyy: "",
      payment_cvc: "4242424242424242",
      payment_card_holder: "",
    },
    onSubmit: (values) => {
      if (selectedCard != "customer_card") {
        isSignedIn ? checkout2() : checkout();
      } else {
        if (Object.keys(formik3.errors).length > 0) {
          Swal.fire({
            title: "Validation Error",
            text: "Please fill the mandatory fields",
            icon: "error",
          });
          return;
        } else {
          //  console.log("checkout ")
          isSignedIn ? checkout2() : checkout();
          // checkout()
        }
      }
    },
    validate: (values) => {
      const errors = {};

      // Perform validation logic for each field
      if (!values.payment_card_no) {
        errors.payment_card_no = "Payment card no is required";
      }
      // else if()
      if (!values.expires_mmyy) {
        errors.expires_mmyy = "Expiry date is required";
      }
      if (!values.payment_cvc) {
        errors.payment_cvc = "CVV is required";
      }
      if (!values.payment_card_holder) {
        errors.payment_card_holder = "Card holder name is required";
      }

      // Add validation logic for other fields

      return errors;
    },
  });

  const handlePinChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldTouched("pin", true);
    formik.setFieldError("pin", "Eamil aeraersadf");
    // Allow only numeric input
    const numericValue = value.replace(/[^0-9]/g, "");

    // Update form values
    if (value.length <= 4) {
      formik.handleChange({
        target: {
          name,
          value: numericValue,
        },
      });
    }
  };

  const [checkEmail] = useCheckEmailMutation();

  const handleEmailChange = (event) => {
    formik.setFieldTouched("email", true);
    const { name, value } = event.target;
    checkEmail(value).then((result) => {
      formik.setFieldTouched("email", true);
      formik.setFieldError("email", "This email already exists");
      if (result.data.emailCount > 0) {
        formik.setFieldTouched("email", true);
        formik.setFieldError("email", "This email already exists");
      }
    });

    // if (formik.touched.email) return;

    // if (event.target.value.length > 1) formik.setFieldTouched("email", true);
    //   const { name, value } = event.target;
    //   console.log("handle Email Change Called")

    //   // Allow only numeric input

    //   // Update form values

    //   formik.handleChange({
    //     target: {
    //       name,
    //       value: value,
    //     },
    //   });

    // if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    //   // console.log(3);
    //   formik.setFieldTouched("email",true)
    //   formik.setErrors({email:"already existe"})
    //   // seterror(errors)
    //   // return false;
    // }
    // else{
    //   // formik.setFieldTouched("email",true)
    //   formik.setFieldError("email","Please enter correct email" )
    //     checkEmail(value).then((result)=>{

    //       console.log(result)
    //       formik.setFieldTouched("email",true)
    //           formik.setFieldError("email","This email already exists" )
    //         if(result.data.emailCount>0)
    //         {
    //           formik.setFieldTouched("email",true)
    //           formik.setFieldError("email","This email already exists" )

    //         }
    //     });

    // }
  };

  const checkOutWrapper = () => {
    if (selectedCard != "customer_card") {
      isSignedIn ? checkout2() : checkout();
    } else {
      formik3.handleSubmit();
    }
  };

  const produceCoupon = (groupid) => {
    let coupondata = [];

    cart_detail?.couponDetails?.forEach((element) => {
      coupondata.push({
        code: element.code,
        amount: getCouponData(element.applied_to, groupid),
        description: element.code,
      });
    });

    return coupondata;
  };

  const getCouponData = (element, groupid) => {
    let total = 0;
    if (element.applied_to_all) {
      element.applied_to_all.forEach((obj) => {
        if (obj.order_group_id == groupid) {
          total = total + obj.discount;
        }
      });
    }

    if (element.applied_to_types) {
      element.applied_to_types.forEach((obj) => {
        if (obj.order_group_id == groupid) {
          total = total + obj.discount;
        }
      });
    }

    if (element.applied_to_products) {
      element.applied_to_products.forEach((obj) => {
        if (obj.order_group_id == groupid) {
          total = total + obj.discount;
        }
      });
    }

    return total;
  };

  const [expanded, setExpanded] = React.useState(["panel1", "panel2"]);

  const handleChange = (panel) => (event, newExpanded) => {
    if (!isSignedIn) return;
    if (expanded.some((x) => x == panel)) {
      setExpanded((prev) => prev.filter((x) => x != panel));
    } else {
      setExpanded([...expanded, panel]);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      setExpanded([]);
    }
  }, [isSignedIn]);

  return (
    <>
      {" "}
      {loader && (
        <div className="overlay">
          <div className="loaderImage-container">
            <span className="loader"></span>
          </div>
        </div>
      )}
      <div className="mb-8">
        {!isSignedIn && (
          <>
            <h2 className="text-[25px] font-bold md:text-[30px] ">
              ACCOUNT DETAILS
            </h2>
            <div className="flex">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-16 p-5 w-[100%] ">
                <TextField
                  label="* First Name"
                  type="search"
                  variant="standard"
                  name="fname"
                  onChange={formik.handleChange}
                  value={formik.values.fname}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                  autocomplete="off"
                />

                <TextField
                  label="* Last Name"
                  type="search"
                  variant="standard"
                  name="lname"
                  onChange={formik.handleChange}
                  value={formik.values.lname}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                  autocomplete="off"
                />

                <TextField
                  label="Company Name"
                  type="search"
                  variant="standard"
                  name="company_name"
                  onChange={formik.handleChange}
                  value={formik.values.company_name}
                  autocomplete="off"
                />
                <TextField
                  label="* Email"
                  type="text"
                  variant="standard"
                  name="email"
                  onChange={(e) => {
                    formik.handleChange(e), handleEmailChange(e);
                  }}
                  // onFocus={handleEmailChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoComplete="email"
                />
                <TextField
                  label="* Phone"
                  type="Phone"
                  variant="standard"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  autoComplete="tel"
                />
                <TextField
                  label="* Password"
                  type="password"
                  variant="standard"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="off"
                />

                <TextField
                  label="* Confirm Password"
                  type="password"
                  variant="standard"
                  name="confirmpass"
                  onChange={formik.handleChange}
                  value={formik.values.confirmpass}
                  error={
                    formik.touched.confirmpass &&
                    Boolean(formik.errors.confirmpass)
                  }
                  helperText={
                    formik.touched.confirmpass && formik.errors.confirmpass
                  }
                  autoComplete="off"
                />

                <TextField
                  label="* Pin"
                  type="text"
                  variant="standard"
                  name="pin"
                  onChange={handlePinChange}
                  value={formik.values.pin}
                  error={formik.touched.pin && Boolean(formik.errors.pin)}
                  helperText={formik.touched.pin && formik.errors.pin}
                  autoComplete="off"
                />
              </div>
            </div>
          </>
        )}
        <Accordion
          expanded={expanded.some((x) => x == "panel1")}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            showIcon={isSignedIn}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            {" "}
            <h2 className="text-[25px] font-bold md:text-[30px] ">
              SHIPPING DETAILS
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <div className="flex">
              <div
                className="grid
             grid-cols-1 md:grid-cols-2 gap-4 gap-x-16 p-5 w-[100%] "
              >
                <TextField
                  label="* Shipping First Name"
                  type="search"
                  variant="standard"
                  name="shipping_fname"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_fname}
                  error={
                    formik.touched.shipping_fname &&
                    Boolean(formik.errors.shipping_fname)
                  }
                  helperText={
                    formik.touched.shipping_fname &&
                    formik.errors.shipping_fname
                  }
                  autocomplete="off"
                />

                <TextField
                  label="* Shipping Last Name"
                  type="search"
                  variant="standard"
                  name="shipping_lname"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_lname}
                  error={
                    formik.touched.shipping_lname &&
                    Boolean(formik.errors.shipping_lname)
                  }
                  helperText={
                    formik.touched.shipping_lname &&
                    formik.errors.shipping_lname
                  }
                  autocomplete="off"
                />

                <TextField
                  label="* Address 1"
                  type="search"
                  variant="standard"
                  name="shipping_address1"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_address1}
                  error={
                    formik.touched.shipping_address1 &&
                    Boolean(formik.errors.shipping_address1)
                  }
                  helperText={
                    formik.touched.shipping_address1 &&
                    formik.errors.shipping_address1
                  }
                  autocomplete="street-address"
                />

                <TextField
                  label="Address 2"
                  type="search"
                  variant="standard"
                  name="shipping_address2"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_address2}
                  error={
                    formik.touched.shipping_address2 &&
                    Boolean(formik.errors.shipping_address2)
                  }
                  helperText={
                    formik.touched.shipping_address2 &&
                    formik.errors.shipping_address2
                  }
                  autoComplete="off"
                />
                <TextField
                  label="* City"
                  type="search"
                  variant="standard"
                  name="shipping_city"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_city}
                  error={
                    formik.touched.shipping_city &&
                    Boolean(formik.errors.shipping_city)
                  }
                  helperText={
                    formik.touched.shipping_city && formik.errors.shipping_city
                  }
                  autoComplete="off"
                />

                <TextField
                  variant="standard"
                  name="shipping_state_id"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_state_id}
                  error={
                    formik.touched.shipping_state_id &&
                    Boolean(formik.errors.shipping_state_id)
                  }
                  helperText={
                    formik.touched.shipping_state_id &&
                    formik.errors.shipping_state_id
                  }
                  className="half"
                  id="outlined-required"
                  select
                  label="* State"
                >
                  {states.map((option, i) => (
                    <MenuItem key={i} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="* Zipcode"
                  type="search"
                  variant="standard"
                  name="shipping_zip"
                  onChange={formik.handleChange}
                  value={formik.values.shipping_zip}
                  error={
                    formik.touched.shipping_zip &&
                    Boolean(formik.errors.shipping_zip)
                  }
                  helperText={
                    formik.touched.shipping_zip && formik.errors.shipping_zip
                  }
                  autoComplete="postal-code"
                />
              </div>
            </div>
            {isSignedIn && (
              <div className="flex justify-center">
                <button
                  className={`rounded-[30px] mt-[60px] flex items-center font-bold text-white  bg-dfblue  p-2 px-5`}
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Update Information
                </button>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.some((x) => x == "panel2")}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            showIcon={isSignedIn}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <h2 className="text-[25px] font-bold md:text-[30px]">
              BILLING DETAILS
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <div className="">
              <FormControlLabel
                className="font-bold"
                sx={{
                  "&.MuiFormControlLabel-label": {
                    fontWeight: "bold",
                  },
                  fontWeight: "bold",
                }}
                control={
                  <Checkbox
                    checked={billShip}
                    onChange={handleBillShip}
                    icon={<Mycheckbox />}
                    checkedIcon={<Mycheckboxchecked />}
                    size="small"
                  />
                }
                label="Billing address is the same as shipping address"
              />
            </div>
            <div className="flex ">
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4 gap-x-16 p-5 w-[100%] ">
                <TextField
                  label="* Billing First Name"
                  type="search"
                  variant="standard"
                  name="billing_fname"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_fname}
                  error={
                    formik2.touched.billing_fname &&
                    Boolean(formik2.errors.billing_fname)
                  }
                  helperText={
                    formik2.touched.billing_fname &&
                    formik2.errors.billing_fname
                  }
                  autocomplete="off"
                />

                <TextField
                  label="* Billing Last Name"
                  type="search"
                  variant="standard"
                  name="billing_lname"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_lname}
                  error={
                    formik2.touched.billing_lname &&
                    Boolean(formik2.errors.billing_lname)
                  }
                  helperText={
                    formik2.touched.billing_lname &&
                    formik2.errors.billing_lname
                  }
                  autocomplete="off"
                />

                <TextField
                  label="* Address 1"
                  type="search"
                  variant="standard"
                  name="billing_address1"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_address1}
                  error={
                    formik2.touched.billing_address1 &&
                    Boolean(formik2.errors.billing_address1)
                  }
                  helperText={
                    formik2.touched.billing_address1 &&
                    formik2.errors.billing_address1
                  }
                  autocomplete="street-address"
                />

                <TextField
                  label="Address 2"
                  type="search"
                  variant="standard"
                  name="billing_address2"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_address2}
                  error={
                    formik2.touched.billing_address2 &&
                    Boolean(formik2.errors.billing_address2)
                  }
                  helperText={
                    formik2.touched.billing_address2 &&
                    formik2.errors.billing_address2
                  }
                  autoComplete="off"
                />

                <TextField
                  label="* City"
                  type="search"
                  variant="standard"
                  name="billing_city"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_city}
                  error={
                    formik2.touched.billing_city &&
                    Boolean(formik2.errors.billing_city)
                  }
                  helperText={
                    formik2.touched.billing_city && formik2.errors.billing_city
                  }
                  autoComplete="off"
                />

                <TextField
                  variant="standard"
                  name="billing_state_id"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_state_id}
                  error={
                    formik2.touched.billing_state_id &&
                    Boolean(formik2.errors.billing_state_id)
                  }
                  helperText={
                    formik2.touched.billing_state_id &&
                    formik2.errors.billing_state_id
                  }
                  className="half"
                  id="outlined-required"
                  select
                  label="* State"
                >
                  {states.map((option, i) => (
                    <MenuItem key={i} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="* Zipcode"
                  type="search"
                  variant="standard"
                  name="billing_zip"
                  onChange={formik2.handleChange}
                  value={formik2.values.billing_zip}
                  error={
                    formik2.touched.billing_zip &&
                    Boolean(formik2.errors.billing_zip)
                  }
                  helperText={
                    formik2.touched.billing_zip && formik2.errors.billing_zip
                  }
                  autocomplete="postal-code"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className={`rounded-[30px] mt-[60px] flex items-center font-bold text-white  bg-dfblue  p-2 px-5`}
                type="submit"
                onClick={formik.handleSubmit}
              >
                {isSignedIn ? "Update Information" : "Save and Log In"}
              </button>
            </div>
          </AccordionDetails>
        </Accordion>

        {isSignedIn && <CouponSection />}
        <div ref={paymentRef}>
          {isSignedIn && (
            <>
              {" "}
              <h2 className="text-[25px] font-bold md:text-[30px] mt-10">
                PAYMENT DETAILS
              </h2>
              <div className="flex flex-col justify-center my-4 ">
                {billingCards?.map((obj, i) => {
                  return (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          onChange={() => setSelectedCard(obj.id)}
                          checked={obj.id == selectedCard}
                          icon={<Mycheckbox />}
                          checkedIcon={<Mycheckboxchecked />}
                        />
                      }
                      label={obj.info}
                    />
                  );
                })}
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setSelectedCard("customer_card")}
                      checked={selectedCard == "customer_card"}
                      icon={<Mycheckbox />}
                      checkedIcon={<Mycheckboxchecked />}
                    />
                  }
                  label="New card"
                />
              </div>
              {selectedCard === "customer_card" && (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enableAutopay}
                        onChange={() => setenableAutopay(!enableAutopay)}
                        hy
                        checkedIcon={<Mycheckboxchecked />}
                      />
                    }
                    label="Enable Autopay"
                  />
                  <div className="flex ">
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 gap-x-16 p-5 w-[100%] ">
                      <TextField
                        label="* Name on card"
                        type="search"
                        variant="standard"
                        name="payment_card_holder"
                        onChange={formik3.handleChange}
                        value={formik3.values.payment_card_holder}
                        error={
                          formik3.touched.payment_card_holder &&
                          Boolean(formik3.errors.payment_card_holder)
                        }
                        helperText={
                          formik3.touched.payment_card_holder &&
                          formik3.errors.payment_card_holder
                        }
                        autoComplete="cc-name"
                      />
                      <TextField
                        label="* Credit Card Number"
                        type="search"
                        variant="standard"
                        name="payment_card_no"
                        InputProps={{
                          inputComponent: TextMaskCustom,
                        }}
                        onChange={formik3.handleChange}
                        value={formik3.values.payment_card_no}
                        placeholder="0000 0000 0000 0000"
                        error={
                          formik3.touched.payment_card_no &&
                          Boolean(formik3.errors.payment_card_no)
                        }
                        helperText={
                          formik3.touched.payment_card_no &&
                          formik3.errors.payment_card_no
                        }
                        autoComplete="cc-number"
                      />

                      <TextField
                        label="* Expiry Date"
                        type="search"
                        variant="standard"
                        name="expires_mmyy"
                        placeholder="MM/YY"
                        InputProps={{
                          inputComponent: MMYY,
                        }}
                        onChange={formik3.handleChange}
                        value={formik3.values.expires_mmyy}
                        error={
                          formik3.touched.expires_mmyy &&
                          Boolean(formik3.errors.expires_mmyy)
                        }
                        helperText={
                          formik3.touched.expires_mmyy &&
                          formik3.errors.expires_mmyy
                        }
                        autoComplete="cc-exp"
                      />

                      <TextField
                        label="* Security Code"
                        type="search"
                        variant="standard"
                        name="payment_cvc"
                        onChange={formik3.handleChange}
                        value={formik3.values.payment_cvc}
                        error={
                          formik3.touched.payment_cvc &&
                          Boolean(formik3.errors.payment_cvc)
                        }
                        helperText={
                          formik3.touched.payment_cvc &&
                          formik3.errors.payment_cvc
                        }
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </>
              )}
              <Divider />
              <div className="flex flex-col mt-5 items-center">
                <p>
                  {" "}
                  Click{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-[#0d6efd]"
                  >
                    here
                  </Link>{" "}
                  to read the terms of service.
                </p>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={agreement}
                      onChange={(e) => setagreement(!agreement)}
                    />
                  }
                  label="I accept the terms of service."
                />
              </div>
              <div className="flex justify-center">
                {" "}
                <button
                  disabled={!agreement}
                  className={`rounded-[30px] mt-[60px] flex items-center font-bold text-white ${
                    agreement ? "bg-dfblue" : "bg-[#828FB0]"
                  }  p-2 px-5`}
                  onClick={checkOutWrapper}
                  type="submit"
                >
                  <IoMdLock />
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShipBill;
