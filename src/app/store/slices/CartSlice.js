import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHashing,
  getCartDetail,
  getCartDetailUpgrate,
  orderGroup,
} from "../thunks/CartThunks";
import { getCustomerOrder } from "../thunks/UserThunks";
import { logoutUser } from "./UserSlice";
import { express_shipment_id } from "@/app/helperData/constants";

let initialStateFirst = {};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateFirst,
  reducers: {
    updateCart(state, action) {
      state[action.payload.name] = action.payload.value;
    },

    clearCart(state, action) {
      return {
        cart_detail: { order_completed: true },
        previous_cart: state.cart_detail,
      };
    },
    resetCart(statae, action) {
      return initialStateFirst;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHashing.pending, (state, action) => {});
    builder.addCase(fetchHashing.fulfilled, (state, action) => {
      state.order_hash = action.payload.order_hash;
    });
    builder.addCase(fetchHashing.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });

    builder.addCase(getCartDetail.pending, (state, action) => {});
    builder.addCase(getCartDetail.fulfilled, (state, action) => {
      //  debugger

      if (action.payload.order_groups)
        if (
          action.payload.order_groups.some(
            (x) => x?.device?.id == express_shipment_id
          )
        ) {
          action.payload.express_shipment = action.payload.order_groups.filter(
            (x) => x.device.id == express_shipment_id
          )[0];
        }

      // action.payload.order_groups = [
      //   ...action.payload.order_groups
      //     .filter((x) => x.plan && x.device && x.sim)
      //     .reduce((combinePlans, x) => {

      //       if (combinePlans.some((y) => y.plan.id == x.plan.id)) {
      //         let planX = x;
      //         planX.qty =
      //           combinePlans.filter((y) => y.plan.id == x.plan.id)[0].qty + 1;
      //         planX.order_groups_arr = [
      //           ...combinePlans.filter((y) => y.plan.id == x.plan.id)[0]
      //             .order_groups_arr,
      //           x.id,
      //         ];

      //         if(planX.plan_prorated_amt)
      //         {
      //         planX.plan_prorated_order_groups=[...combinePlans.filter((y) => y.plan.id == x.plan.id)[0]
      //         .plan_prorated_order_groups,x.id+1]
      //         }
      //         return [
      //           ...combinePlans.filter((y) => y.plan.id != x.plan.id),
      //           planX,
      //         ];
      //       }
      //       let t = x;
      //       t.qty = 1;
      //       t.order_groups_arr = [t.id];
      //       if(x.plan_prorated_amt)
      //       {
      //         t.plan_prorated_order_groups=[t.id+1];

      //       }
      //       return [...combinePlans, t];
      //     }, []),
      //   ...action.payload.order_groups
      //     .filter(
      //       (x) => x.device && !x.plan && x.device.id != express_shipment_id
      //     )
      //     .reduce((combineDevice, x) => {
      //       if (combineDevice.some((y) => y.device.id == x.device.id)) {
      //         let deviceX = x;
      //         deviceX.qty =
      //           combineDevice.filter((y) => y.device.id == x.device.id)[0].qty +
      //           1;
      //         deviceX.order_groups_arr = [
      //           ...combineDevice.filter((y) => y.device.id == x.device.id)[0]
      //             .order_groups_arr,
      //           x.id,
      //         ];
      //         return [
      //           ...combineDevice.filter((y) => y.device.id != x.device.id),
      //           deviceX,
      //         ];
      //       }
      //       let t = x;
      //       t.qty = 1;
      //       t.order_groups_arr = [t.id];
      //       return [...combineDevice, t];
      //     }, []),
      // ];

      state.cart_detail = action.payload;
    });
    builder.addCase(getCartDetail.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });

    builder.addCase(getCustomerOrder.pending, (state, action) => {});
    builder.addCase(getCustomerOrder.fulfilled, (state, action) => {
      if (
        !action.payload.order_groups ||
        action.payload.order_groups.length == 0 ||
        action.payload.order_groups[0].plan == null
      ) {
        return initialStateFirst;
      }
      if (
        action.payload.order_groups.some(
          (x) => x.device.id == express_shipment_id
        )
      ) {
        action.payload.express_shipment = action.payload.order_groups.filter(
          (x) => x.device.id == express_shipment_id
        )[0];
      }

      // action.payload.order_groups = [
      //   ...action.payload.order_groups
      //     .filter((x) => x.plan)
      //     .reduce((combinePlans, x) => {
      //       if (combinePlans.some((y) => y.plan.id == x.plan.id)) {
      //         let planX = x;
      //         planX.qty =
      //           combinePlans.filter((y) => y.plan.id == x.plan.id)[0].qty + 1;
      //         planX.order_groups_arr = [
      //           ...combinePlans.filter((y) => y.plan.id == x.plan.id)[0]
      //             .order_groups_arr,
      //           x.id,
      //         ];
      //         return [
      //           ...combinePlans.filter((y) => y.plan.id != x.plan.id),
      //           planX,
      //         ];
      //       }
      //       let t = x;
      //       t.qty = 1;
      //       t.order_groups_arr = [t.id];
      //       return [...combinePlans, t];
      //     }, []),
      //   ...action.payload.order_groups
      //     .filter(
      //       (x) => x.device && !x.plan && x.device.id != express_shipment_id
      //     )
      //     .reduce((combineDevice, x) => {
      //       if (combineDevice.some((y) => y.device.id == x.device.id)) {
      //         let deviceX = x;
      //         deviceX.qty =
      //           combineDevice.filter((y) => y.device.id == x.device.id)[0].qty +
      //           1;
      //         deviceX.order_groups_arr = [
      //           ...combineDevice.filter((y) => y.device.id == x.device.id)[0]
      //             .order_groups_arr,
      //           x.id,
      //         ];
      //         return [
      //           ...combineDevice.filter((y) => y.device.id != x.device.id),
      //           deviceX,
      //         ];
      //       }
      //       let t = x;
      //       t.qty = 1;
      //       t.order_groups_arr = [t.id];
      //       return [...combineDevice, t];
      //     }, []),
      // ];

      state.cart_detail = action.payload;
      state.order_hash = action.payload.order_hash;
      // state.order_hash=
    });
    builder.addCase(getCustomerOrder.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });

    builder.addCase(getCartDetailUpgrate.fulfilled, (state, action) => {
      state.cart_detail = {
        ...action.payload,
        order_groups: [...action.payload.order_groups].map((obj) => {
          obj.qty = 1;
          return obj;
        }),
        type: "upgrade_downgrade",
        order_groups_arr: action.payload.order_groups.map((x) => x.id),
      };
      state.order_hash = action.payload.order_hash;
      // state.order_hash=
    });

    builder.addCase(logoutUser, (state, action) => {
      return initialStateFirst;
      // state.order_hash=
    });
  },
});

export const { updateCart, clearCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
