import React from "react";
import { useFetchAllProductsQuery } from "../../../../store/slices/apiSlice";
import s from "./ProductContainer.module.css";


const ProductContainer = () => {
  const { data: products }= useFetchAllProductsQuery();




  return (
    <div className={s.products_container}>
       
      
    </div>
  );
};

export default ProductContainer;
