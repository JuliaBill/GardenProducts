import React from 'react'
import { useSelector } from 'react-redux'

import s from './CartProducts.module.css'
import CartCard from '../CartCard/CartCard'

export const CartProducts = () => {
  const products = useSelector((state) => state.cart.products)
  return (
    <div className={s.cartProductsContainer}>
      {products.length === 0 ? (
        <p className={s.info}>Empty</p>
      ) : (
        products.map((product) => <CartCard key={product.id} product={product} />)
      )}
    </div>
  )
}
