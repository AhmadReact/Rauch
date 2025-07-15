import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createUser = createAsyncThunk("user/create", async (obj) => {
  let newObj = obj;

  if (obj.company_name === "" || obj.company_name == null) {
    delete newObj["company_name"];
  }
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/create-customer`,
    newObj,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const chargeCard = createAsyncThunk("user/charge-card", async (obj) => {
  if (obj.amount == 0) {
    return { success: true };
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/charge-card`,
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

const addCardAndCharge = createAsyncThunk(
  "user/addcard&charge",
  async (obj) => {
    const { cardInfo, chargeInfo } = obj;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/add-card`,
      cardInfo,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    console.log("response ", response);

    const response2 = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/charge-new-card`,
      {
        ...chargeInfo,
        ...cardInfo,
        credit_card_id: response.data.card.card.id,
      },
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response2.data;
  }
);

const chargeCardWithOutOrder = createAsyncThunk(
  "user/chargecardwithout",
  async (obj) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/charge-card`,
      obj,
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

const createSubscription = createAsyncThunk(
  "user/subscription",
  async (obj) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/create-subscription`,
      obj,
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

const updateSubscription = createAsyncThunk(
  "user/updatesubscription",
  async (obj) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/update-subscription`,
      obj,
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

const getCustomerDetail = createAsyncThunk(
  "user/getcustomerdetail",
  async (customer_hash) => {
    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/customer?hash=${customer_hash}`,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return { ...response2.data };
  }
);

const checkMonthlyInvoice = createAsyncThunk(
  "user/checkmonthlyinvoice",
  async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/check-monthly-invoice?id=${id}`,
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

const getCustomerOrder = createAsyncThunk(
  "user/getcustomerorder",
  async (customer_id, { getState }) => {
    const state = getState();
    const response1 = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/check-monthly-invoice?id=${customer_id}`,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/order?customer_id=${customer_id}&paid_monthly_invoice=${state?.user?.userInfo?.id}`,
      {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return { ...response2.data, paid_monthly_invoice: response1.data };
  }
);

const getUserBillingCards = createAsyncThunk(
  "user/userbillingcards",
  async (customer_id) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/customer-cards`,
      {
        customer_id: customer_id,
      },
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

const updateCustomerInfo = createAsyncThunk(
  "user/updatecustomer",
  async (obj) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/update-customer`,
      obj,
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

const removeCustomerCard = createAsyncThunk("user/removecard", async (obj) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/remove-card?customer_credit_card_id=${obj}`,
    {},
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const addCustomerCard = createAsyncThunk("user/addcard", async (obj) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/add-card`,
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

const customerInvoices = createAsyncThunk("user/invoices", async (obj) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/customer-current-invoice?hash=${obj.hash}&id=${obj.id}`,
    {
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  return response.data;
});

const updateSubLabel = createAsyncThunk("user/updatelabel", async (obj) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/update-sub-label`,
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

const makePrimaryCardService = createAsyncThunk(
  "user/setprimary",
  async (obj) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/primary-card`,
      obj,
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

const getCustomerTax = createAsyncThunk("user/gettax", async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/customer?tax_id=${id}`,
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
  createUser,
  chargeCard,
  createSubscription,
  getCustomerDetail,
  getCustomerOrder,
  getUserBillingCards,
  updateCustomerInfo,
  removeCustomerCard,
  addCustomerCard,
  customerInvoices,
  chargeCardWithOutOrder,
  updateSubLabel,
  makePrimaryCardService,
  getCustomerTax,
  updateSubscription,
  checkMonthlyInvoice,
  addCardAndCharge,
};
