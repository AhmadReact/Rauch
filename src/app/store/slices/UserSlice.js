import { useDispatch } from "react-redux";
import {
  createUser,
  customerInvoices,
  getCustomerDetail,
  getCustomerOrder,
  getUserBillingCards,
} from "../thunks/UserThunks";

const { createSlice } = require("@reduxjs/toolkit");

let initialStateFirst = {
  userInfo: {},
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateFirst,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload;
    },
    updateUserData(state, action) {
      state.data = action.payload;
    },
    updateEnableAutoPay(state, action) {
      state.userInfo.auto_pay = action.payload;
    },
    updateUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    logoutUser(state, action) {
      return initialStateFirst;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.pending, (state, action) => {});
    builder.addCase(createUser.fulfilled, (state, action) => {
      // console.log(action)
      // if(action.payload.customer)
      // {
      // state.userInfo = { ...state.userInfo, ...action.payload.customer };
      // state.isSignedIn = true;
      //  }
    });
    builder.addCase(createUser.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });

    builder.addCase(getCustomerDetail.pending, (state, action) => {});
    builder.addCase(getCustomerDetail.fulfilled, (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      state.isSignedIn = true;
    });
    builder.addCase(getCustomerDetail.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });

    builder.addCase(getUserBillingCards.pending, (state, action) => {});
    builder.addCase(getUserBillingCards.fulfilled, (state, action) => {
      state.billingCards = action.payload;
    });
    builder.addCase(getUserBillingCards.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;

      console.log("error");
    });

    builder.addCase(customerInvoices.fulfilled, (state, action) => {
      state.account_statement = action.payload;
    });
  },
});

export const {
  loginUser,
  updateUserData,
  logoutUser,
  updateEnableAutoPay,
  updateUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
