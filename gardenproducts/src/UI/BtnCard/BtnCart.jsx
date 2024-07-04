import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'
import s from './BtnCart.module.css'

export const ButtonTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
}

export default function BtnCard({ type }) {
  const [isSubmitting, setSubmitting] = useState(false)

  const handleClick = () => {
    if (type === ButtonTypes.ADD_TO_CART) {
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
      }, 2000)
    }
  }

  const buttonClass = classNames(s.card_btn, {
    [s.add_btn]: type === ButtonTypes.ADD_TO_CART,
    [s.submitted]: isSubmitting,
    [s.btn_green]: type === ButtonTypes.CHECK_OUT || type === ButtonTypes.GO_HOME || type === ButtonTypes.SHOPPING,
  })

  const addBtnClass = classNames(s.add_btn, {
    [s.disabled_hover]: isSubmitting && type === ButtonTypes.ADD_TO_CART,
  })

  return (
    <div className={buttonClass}>
      {type === ButtonTypes.ADD_TO_CART && (
        <button onClick={handleClick} className={addBtnClass}>
          {isSubmitting ? 'Added' : 'Add to cart'}
        </button>
      )}

      {type === ButtonTypes.SHOPPING && (
        <Link to={'/products'}>
          <button className={s.btn_green}>Go Home</button>
        </Link>
      )}
    </div>
  )
}