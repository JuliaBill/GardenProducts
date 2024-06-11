import React from 'react'
import { CartProducts } from '../CartProducts/CartProducts'
import CartOrder from '../CartOrder/CartOrder'
import { useSelector } from 'react-redux'
import s from './CartComponent.module.css'
import EmptyCartComponent from '../EmptyCartComponent/EmptyCartComponent'

function CartComponent() {
  const basketCart = useSelector((state) => state.cart.products)

  const isCartEmpty = basketCart.length === 0

  return isCartEmpty ? (
    <EmptyCartComponent />
  ) : (
    <div className={s.container}>
      <CartProducts />
      <CartOrder basketCart={basketCart} />
    </div>
  )
}

export default CartComponent
