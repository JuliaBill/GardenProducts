import { createSlice } from '@reduxjs/toolkit'

const likedProductsSlice = createSlice({
  name: 'likedProducts',
  initialState: {
    likedProducts: [],
  },
  reducers: {
    addLikedProduct: (state, action) => {
      state.likedProducts.push(action.payload)
    },
    removeLikedProduct: (state, action) => {
      state.likedProducts = state.likedProducts.filter((product) => product?.id !== action.payload.id)
    },
  },
})

export const { addLikedProduct, removeLikedProduct } = likedProductsSlice.actions
export default likedProductsSlice.reducer
