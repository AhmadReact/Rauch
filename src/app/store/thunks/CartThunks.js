import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchHashing = createAsyncThunk("cart/hash", async (obj) => {
  //  console.log("fetch gashinh",obj)
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order`,
    obj,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const addToCart = createAsyncThunk(
  "cart/addtocart",
  async (obj, { getState }) => {
    const state = getState();

    const formData = new FormData();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          key === "order_hash" ||
          key === "plan_id" ||
          key === "sim_id" ||
          key === "device_id" ||
          key == "customer_hash"
        )
          formData.append(key, obj[key]);
      }
    }
    formData.append(
      "paid_monthly_invoice",
      state.user.userInfo?.paid_monthly_invoice
    );
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data;
  }
);

const getCartDetail = createAsyncThunk(
  "cart/getcartdetail",
  async (payload, { getState }) => {
    const state = getState();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order?order_hash=${payload}&paid_monthly_invoice=${state.user.userInfo?.paid_monthly_invoice}`,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data;
  }
);

const getCartDetailUpgrate = createAsyncThunk(
  "cart/getcartdetailupgrade",
  async (order_hash) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order?order_hash=${order_hash}`,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data;
  }
);

const orderGroup = createAsyncThunk("cart/ordergroup", async (order_hash) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order-group`,
    { action: 1, order_hash: order_hash },
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const removeFromCart = createAsyncThunk(
  "cart/removeitem",
  async (data, { getState }) => {
    const state = getState();

    if (state?.user?.userInfo?.paid_monthly_invoice) {
      if (state?.cart?.cart_detail?.order_groups[0]?.plan_prorated_amt) {
        const response1 = await axios.post(
          `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order/remove?order_hash=${
            data.hash
          }&order_group_id=${data.id + 1}&paid_monthly_invoice=null`,
          {},
          {
            headers: {
              "Content-Type": "application/json", // Adjust the content type based on your API requirements
              Authorization: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
      }
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order/remove?order_hash=${data.hash}&order_group_id=${data.id}&paid_monthly_invoice=null`,
      {},
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data;
  }
);

const createDeviceRecord = createAsyncThunk(
  "cart/createdevice",
  async (data) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/create-device-record`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data;
  }
);

const upgradeCart = createAsyncThunk("cart/upgradecart", async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order/update-order-group`,
    data,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const addCoupon = createAsyncThunk("cart/addcoupon", async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/coupon/add-coupon`,
    data,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const removeCoupon = createAsyncThunk("cart/removecoupon", async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/coupon/remove-coupon`,
    data,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

export {
  removeCoupon,
  fetchHashing,
  getCartDetail,
  orderGroup,
  addToCart,
  removeFromCart,
  createDeviceRecord,
  getCartDetailUpgrate,
  upgradeCart,
  addCoupon,
};
