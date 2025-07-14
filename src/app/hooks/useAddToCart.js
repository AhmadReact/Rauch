import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchHashing,
  getCartDetail,
  orderGroup,
} from "../store/thunks/CartThunks";
import Swal from "sweetalert2";
import { useState } from "react";
import { fixedDeviceSim } from "../helperData/constants";
import { useRouter } from "next/navigation";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => {
    return state.user;
  });
  const { order_hash, cart_detail } = useSelector((state) => {
    return state.cart;
  });

  const router = useRouter();

  const [loader, setLoader] = useState(false);
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

  const addToCartWrapper = (plan) => {
    setLoader(true);

    checkOrderHash()
      .then((result) => {
        let tmpObj = {
          plan_id: plan?.id,
          order_hash: result,
          device_id: plan.hasOwnProperty("devices")
            ? plan?.devices[0]?.id
              ? plan?.devices[0]?.id
              : fixedDeviceSim?.device_id
            : fixedDeviceSim?.device_id,
          sim_id: 157,
        };

        // if (cart_detail?.order_groups?.some((obj) => obj.plan.id == plan?.id)) {
        //   tmpObj.device_id = cart_detail.order_groups.filter(
        //     (obj) => obj.plan.id == plan?.id
        //   )[0].device.id;
        // }

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

                setLoader(false);
                dispatch(getCartDetail(result))
                  .unwrap()
                  .then(() => {
                    Swal.fire({
                      title: "Success",
                      text: `${plan.name} plan has been added to your cart.`,
                      denyButtonText: `Checkout`,
                      showDenyButton: true,
                      denyButtonColor: "#7066e0",
                      icon: "success",
                      confirmButtonText: "Shop more",
                      allowOutsideClick: true,
                      allowEscapeKey: false,
                      preDeny: () => {
                        router.push("/checkout");
                      },
                      preConfirm: () => {
                        ("/plans");
                      },
                    }).then((result) => {
                      // check if the modal was closed
                      if (result.isDismissed) {
                        // navigate to the checkout page
                        router.push("/checkout");
                      }
                    });
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

  return [addToCartWrapper, loader];
};
