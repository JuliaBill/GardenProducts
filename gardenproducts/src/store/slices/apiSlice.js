import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => "categories/all",
      
    }),
    fetchCategoryByName: builder.query({
      query: (name) => `categories/${name}`,
    }),
    fetchAllProducts: builder.query({
      query: () => "products/all",
    }),

    postDiscount: builder.mutation({
      query: (discountData) => ({
        url: "sale/send",
        method: "POST",
        body: discountData,
      }),
    }),
  }),
});


export const {
  useFetchCategoriesQuery,
  useFetchCategoryByNameQuery,
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  usePostDiscountMutation,
} = apiSlice;
