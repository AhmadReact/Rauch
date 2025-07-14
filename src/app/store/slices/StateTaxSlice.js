
const { createSlice } = require("@reduxjs/toolkit");


let initialStateFirst={
    
        tax:0
  };



const stateTaxSlice = createSlice({
  name: "tax",
  initialState: initialStateFirst,
  reducers: {
   
    updateTaxState(state, action) {
      state.tax = action.payload;
    },

  },



});

export const { updateTaxState} = stateTaxSlice.actions;
export default stateTaxSlice.reducer;
