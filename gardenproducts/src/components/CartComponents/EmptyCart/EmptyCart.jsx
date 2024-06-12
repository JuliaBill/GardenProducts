import React from 'react'
import s from './EmptyCart.module.css'
import BtnCard, { ButtonTypes } from '../../../UI/btnCard/BtnCart'

export default function EmptyCart() {
  return (
    <div className={s.empty_cart}>
      <div className={s.btn}>
        <p>Liioks like you have no items in your shopping cart</p>
        <div>
          <BtnCard type={ButtonTypes.SHOPPING} />
        </div>
      </div>
    </div>
  )
}
