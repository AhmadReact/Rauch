import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCompanyInfo = createAsyncThunk("company/hash", async (obj) => {
  //  console.log("fetch gashinh",obj)
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/company/get-details`,
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

export { fetchCompanyInfo };
