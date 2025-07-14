import { fetchCompanyInfo } from "../thunks/CompanyThunks";

const { createSlice } = require("@reduxjs/toolkit");

let initialStateFirst = {
  logo: "",
};

const companySlice = createSlice({
  name: "company",
  initialState: initialStateFirst,
  extraReducers(builder) {
    builder.addCase(fetchCompanyInfo.pending, (state, action) => {});
    builder.addCase(fetchCompanyInfo.fulfilled, (state, action) => {
      return { ...action?.payload?.data };
    });
    builder.addCase(fetchCompanyInfo.rejected, (state, action) => {
      // state.isLoading = false;
      // state.error = action.error;
      console.log("error");
    });
  },
});

export const { updateCompanyInfo } = companySlice.actions;
export default companySlice.reducer;
