import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../store/slices/CartSlice";
import { updateTaxState } from "../store/slices/StateTaxSlice";
import { useEffect } from "react";
import { getCustomerTax } from "../store/thunks/UserThunks";

const useExpressEffect = () => {
  const { cart, user } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart?.cart_detail?.express_shipment) {
      dispatch(getCustomerTax(user.userInfo.billing_state_id))
        .unwrap()
        .then((result) => {
          let calculatedtax = 0;
          if (cart.cart_detail.express_shipment.device.taxable) {
            calculatedtax =
              cart.cart_detail.express_shipment.device.amount *
              (result.tax_rate / 100);
          }

          dispatch(updateTaxState(calculatedtax));
        });
    } else {
      dispatch(updateTaxState(0));
    }
  }, [cart, user]);
};

export default useExpressEffect;
