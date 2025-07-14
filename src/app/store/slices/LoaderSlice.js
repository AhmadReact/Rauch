
const { createSlice } = require("@reduxjs/toolkit");


let initialStateFirst={
    
        loader:false
  };



const loaderSlice = createSlice({
  name: "loader",
  initialState: initialStateFirst,
  reducers: {
   
    updateLoaderState(state, action) {
      state.loader = action.payload;
    },

  },



});

export const { updateLoaderState} = loaderSlice.actions;
export default loaderSlice.reducer;
