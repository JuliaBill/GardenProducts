import React from 'react'
import s from './Price.module.css'

export default function Price({ el, realPriceClass, oldPriceClass, saleValueClass }) {
  const discount = Math.round((1 - el.discont_price / el.price) * 100)
  return (
    <div className={s.price_container}>
      {el.discont_price ? (
        <div className={s.price_with_discount}>
          <p className={`${realPriceClass} ${s.real_price}`}>${el.discont_price}</p>
          <p className={`${oldPriceClass} ${s.old_price}`}>{el.price}$</p>
          <div>
            <p className={`${saleValueClass} ${s.sale_value}`}>-{discount}%</p>
          </div>
        </div>
      ) : (
        <div className={`${realPriceClass} ${s.real_price}`}>
          <p>${el.price}</p>
        </div>
      )}
    </div>
  )
}
