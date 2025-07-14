import { useDispatch, useSelector } from "react-redux";
import { fetchHashing } from "../store/thunks/CartThunks";
import { useEffect } from "react";

const useOrderhash = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    if (cart.order_hash) {
      // dispatch(getCartDetail(cart.order_hash))
      return;
    }

    // dispatch(fetchHashing());
  }, []);
};

export default useOrderhash;
