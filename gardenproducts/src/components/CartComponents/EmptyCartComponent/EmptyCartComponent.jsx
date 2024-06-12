import React from 'react'
import s from './EmptyCartComponent.module.scss'
import { useNavigate } from 'react-router-dom'

function EmptyCartComponent() {
  let navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/products')
  }

  return (
    <div className={s.EmptyCartcontainer}>
      <p className={s.text}>Looks like you have no items in your basket currently</p>
      <button className={s.btn} onClick={handleButtonClick}>
        Continue Shopping
      </button>
    </div>
  )
}

export default EmptyCartComponent