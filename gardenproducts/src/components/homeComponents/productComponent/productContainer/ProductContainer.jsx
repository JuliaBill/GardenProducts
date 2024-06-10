import React from "react";
import { useFetchAllProductsQuery } from "../../../../store/slices/apiSlice";
import s from "./ProductContainer.module.css";
import ProductsItem from "../productsItem/ProductsItem";

const ProductContainer = () => {
  const { data: products }= useFetchAllProductsQuery();

  const discountedProducts = products?.filter(
    (product) => product.discont_price !== null
  );

  let randomDiscountedProducts = [];

  while (randomDiscountedProducts.length < 4) {
 
    const randomIndex = Math.floor(Math.random() * discountedProducts.length);
    const randomProduct = discountedProducts[randomIndex];
    if (!randomDiscountedProducts.includes(randomProduct)) {
      randomDiscountedProducts.push(randomProduct);
    }
  }

  return (
    <div className={s.products_container}>
      {randomDiscountedProducts?.map((product) => (
        <ProductsItem key={product.id} el={product} />
      ))}
    </div>
  );
};

export default ProductContainer;
