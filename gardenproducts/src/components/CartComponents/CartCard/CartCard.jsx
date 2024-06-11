import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, deleteProduct, decreaseProduct } from '../../../store/slices/cartSlice'
import { BASE_URL } from '../../../config'
import { Link } from 'react-router-dom'

import s from './CartCard.module.css'

export default function CartCard({ product }) {
  const { id, quantity, title, image, price, discont_price } = product

  const imgLink = `${BASE_URL}${image}`
  const dispatch = useDispatch()

  const [truncatedTitle, setTruncatedTitle] = useState(title)

  const handleResize = useCallback(() => {
    const newTitle =
      window.innerWidth <= 480
        ? title.length > 10
          ? title.substring(0, 10) + '…'
          : title
        : title.length > 30
        ? title.substring(0, 30) + '…'
        : title
    setTruncatedTitle(newTitle)
  }, [title]) // Зависимость от title

  useEffect(() => {
    // Выполнение функции при первоначальной загрузке компонента.
    handleResize()

    // Добавление обработчика события изменения размера окна
    window.addEventListener('resize', handleResize)

    // Удаление обработчика события при демонтаже компонента.
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize]) //Зависимость от title обеспечивает, что useEffect будет вызван при изменении title.

  return (
    <div className={s.card}>
      <img className={s.img} src={imgLink} alt="productPhoto" />
      <div className={s.infoBlock}>
        <div className={s.topLevel}>
          <Link to={`/products/${id}`}>
            <h1 className={s.header}>{truncatedTitle}</h1>
          </Link>
          <button onClick={() => dispatch(deleteProduct(id))} className={s.deleteButton}>
            &#x2715;
          </button>
        </div>
        <div className={s.priceBlock}>
          <div className={s.countButtonContainer}>
            <button className={s.countButton} onClick={() => dispatch(decreaseProduct(id))}>
              -
            </button>
            <p className={s.countValue}>{quantity}</p>
            <button className={s.countButton} onClick={() => dispatch(addProduct(product))}>
              +
            </button>
          </div>
          <div className={s.prices}>
            {/* {* Если присутствует скидка, выводим новую цену, иначе выводим обычную цену */} 
            <p className={s.newPrice}>{discont_price ? `$${discont_price}` : `$${price}`}</p>

            {/* Отображаем старую цену только при наличии скидочной цены */}
            {discont_price ? <p className={s.oldPrice}>${price}</p> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
