import React from "react";
import s from "./style.module.css";
import { BASE_URL } from "../../../src/config.js";

export default function ProductCard({
  id,
  image,
  title,
  price,
  discont_price,
}) {
  const imgLink = `${BASE_URL}${image}`;


  return (
    <div className={s.productCard}>
      <img src={imgLink} alt={title} className={s.productImg} />
      <div className={s.contentBlock}>
        <p className={s.titleP}>{title}</p>
        <div className={s.priceBlock}>
          {discont_price ? (
            <>
              <p className={s.discountPrice}>{discont_price} $</p>
              <p className={s.originalPrice}>{price} $</p>
              <p className={s.discountPercent}>
              </p>
            </>
          ) : (
            <p className={s.originalPrice}>{price} $</p>
          )}
        </div>
      </div>
    </div>
  );
}
