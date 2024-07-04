
import React from 'react'
import s from './style.module.scss'
import { BASE_URL } from '../../../src/config.js'

export default function ProductCard({ id, image, title, price, discont_price }) {
  const imgLink = `${BASE_URL}${image}`

  // Расчёт процента скидки
  const discountPercent = discont_price ? ((price - discont_price) / price) * 100 : 0

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
              <p className={s.discountPercent}>-{discountPercent.toFixed(0)} %</p>
            </>
          ) : (
            <p className={s.originalPrice}>{price} $</p>
          )}
        </div>
      </div>
    </div>
  )
} 