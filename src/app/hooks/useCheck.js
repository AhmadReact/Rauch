import { useDispatch, useSelector } from "react-redux";
import {
  checkMonthlyInvoice,
  getCustomerDetail,
  getCustomerOrder,
} from "../store/thunks/UserThunks";
import { useEffect } from "react";
import { logoutUser, updateUserInfo } from "../store/slices/UserSlice";
import { fetchHashing, getCartDetail } from "../store/thunks/CartThunks";
import { useRouter } from "next/navigation";

const useCheck = () => {
  const cart = useSelector((state) => {
    return state.cart;
  });

  const user = useSelector((state) => {
    return state.user;
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isSignedIn) {
      dispatch(getCustomerDetail(user.userInfo.hash))
        .unwrap()
        .then((result) => {
          if (result.error) {
            dispatch(logoutUser());
          } else {
            dispatch(getCustomerOrder(user.userInfo.id))
              .unwrap()
              .then((result) => {
                if (!result.order_hash) {
                  dispatch(fetchHashing());
                }
              });
          }
        });
    } else if (cart?.order_hash) {
      dispatch(getCartDetail(cart?.order_hash))
        .unwrap()
        .then((result) => {
          if (result.details) {
            dispatch(logoutUser());
          }

          if (
            !user.isSignedIn &&
            result.order_groups.some((x) => x.plan_prorated_amt)
          ) {
            dispatch(logoutUser());
            router.push("/");
          }
        })
        .catch(() => {
          dispatch(logoutUser());
          router.push("/");
        });
    }
  }, []);

  useEffect(() => {
    if (user?.userInfo?.id) {
      if (!user.userInfo.hasOwnProperty("paid_monthly_invoice")) {
        dispatch(checkMonthlyInvoice(user.userInfo.id))
          .unwrap()
          .then((response) => {
            dispatch(updateUserInfo({ paid_monthly_invoice: response }));
          });
      }
    }
  }, [user]);
};

export default useCheck;
