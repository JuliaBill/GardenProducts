import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  totalSum: 0,
  discountApplied: false,
}

// function calculateTotalSum(products) {
//   return products.reduce((total, product) => {
//     const priceToUse = product.discont_price ? product.discont_price : product.price
//     return total + priceToUse * product.quantity
//   }, 0)
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addProduct(state, action) {
    //   const existingProductIndex = state.products.findIndex((product) => product.id === action.payload.id)
    //   if (existingProductIndex !== -1) {
    //     state.products[existingProductIndex].quantity += 1
    //   } else {
    //     state.products.push({ ...action.payload, quantity: 1 })
    //   }
    //   state.totalSum = calculateTotalSum(state.products)
    // },

    // deleteProduct(state, action) {
    //   const index = state.products.findIndex((product) => product.id === action.payload)
    //   if (index !== -1) {
    //     state.products.splice(index, 1)
    //   }
    //   state.totalSum = calculateTotalSum(state.products)
    // },

    // decreaseProduct(state, action) {
    //   const index = state.products.findIndex((product) => product.id === action.payload)
    //   if (index !== -1 && state.products[index].quantity > 1) {
    //     state.products[index].quantity -= 1
    //   } else {
    //     state.products.splice(index, 1)
    //   }
    //   state.totalSum = calculateTotalSum(state.products)
    // },

    // clearCart(state) {
    //   state.products = []
    //   state.totalSum = 0
    //   state.discountApplied = false
    // },

    // applyDiscount(state) {
    //   state.discountApplied = true
    //   state.totalSum = calculateTotalSum(state.products)
    // },
  },
})

// export const { addProduct, deleteProduct, decreaseProduct, clearCart, applyDiscount } = cartSlice.actions
export default cartSlice.reducer
