import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: "",
  maxPrice: "",
  discounted: false,
  sorted: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState, 
  reducers: {
    minPriceChange: (state, action) => ({
      ...state,
      minPrice: action.payload,
    }),
    maxPriceChange: (state, action) => ({
      ...state,
      maxPrice: action.payload,
    }),
    discountChange: (state, action) => ({
      ...state,
      discounted: action.payload,
    }),
    sortedChange: (state, action) => ({
      ...state,
      sorted: action.payload,
    }),
    resetFilter: (state) => initialState,
  },
});

export const {
  minPriceChange,
  maxPriceChange,
  discountChange,
  sortedChange,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
