import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import s from "./ProductsItem.module.css";

export default function ProductItem({ el }) {


  return (
    <div className={s.products_wrapper}>
      <div className={s.image_container}>
        <Link to={`/products/${el.id}`} className={s.products_link}>
          <img
            src={`${BASE_URL}${el.image}`}
            alt={el.title}
            className={s.products_img}
          />
        </Link>
        <div className={s.icons_wrapper}>
        </div>
      </div>
      <div className={s.add_btn} >
   
      </div>
      <div className={s.products_information}>
        <Link to={`/products/${el.id}`} className={s.products_link}>
          <h3 className={s.products_title}>{el.title}</h3>
        </Link>
 
      </div>
    </div>
  );
}
