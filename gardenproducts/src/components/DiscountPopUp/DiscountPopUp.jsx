import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchAllProductsQuery } from '../../store/slices/apiSlice'
import { addProduct } from '../../store/slices/cartSlice'
import { BASE_URL } from '../../config'
import { addLikedProduct, removeLikedProduct } from '../../store/slices/likedProductsSlice'
import { Link } from 'react-router-dom'

import heart from '../../media/icons/heart.svg' // Импорт иконки сердца
import greenHeart from '../../media/icons/greenHeart.svg'
import './DiscountPopUp.scss'

const DiscountPopUp = ({ onClose }) => {
  const dispatch = useDispatch()
  const { data: products } = useFetchAllProductsQuery() // Получение данных всех продуктов
  const [discountedProduct, setDiscountedProduct] = useState(null) // Состояние для хранения дисконтного продукта
  const [isOpen, setIsOpen] = useState(false) // Состояние для открытия/закрытия модального окна
  const [isDiscountProductAdded, setIsDiscountProductAdded] = useState(false) // Состояние для отслеживания добавления дисконтного продукта в корзину
  const [isModalOpen, setIsModalOpen] = useState(false) // Состояние для модального окна

  // Закрытие модального окна при клике на задний фон
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Проверка, добавлялся ли дисконтный товар сегодня
  useEffect(() => {
    const today = new Date().toDateString()
    const lastDiscountDate = localStorage.getItem('lastDiscountDate')

    if (lastDiscountDate !== today) {
      setIsDiscountProductAdded(false)
    } else {
      setIsDiscountProductAdded(true)
    }
  }, [])

  // Выбор случайного дисконтного продукта при загрузке
  useEffect(() => {
    if (products && products.length > 0) {
      const nonDiscountedProducts = products.filter((product) => product.discont_price === null)
      if (nonDiscountedProducts.length > 0 && !isDiscountProductAdded) {
        const randomProduct = nonDiscountedProducts[Math.floor(Math.random() * nonDiscountedProducts.length)]
        setDiscountedProduct({
          ...randomProduct,
          discountedPrice: +(randomProduct.price * 0.5).toFixed(2), // Установка цены со скидкой 50%
        })
        setIsOpen(true)
      }
    }
  }, [products, isDiscountProductAdded])

  // Добавление дисконтного продукта в корзину
  const handleAddToCart = () => {
    if (discountedProduct) {
      // Добавляем продукт со скидкой 50%
      const discountedProductWithOldPrice = {
        ...discountedProduct,
        quantity: 1,
        price: discountedProduct.discountedPrice,
        oldPrice: discountedProduct.price, // Сохраняем старую цену
      }
      dispatch(addProduct(discountedProductWithOldPrice))

      setIsDiscountProductAdded(true)

      // Сохраняем текущую дату в localStorage
      const today = new Date().toDateString()
      localStorage.setItem('lastDiscountDate', today)

      // Закрываем модальное окно после добавления товара в корзину
      setIsModalOpen(false)
    }
  }

  // Закрытие модального окна
  const handleClosePopup = () => {
    setIsOpen(false)
    setDiscountedProduct(null)
  }

  // Проверка, лайкнут ли продукт
  const likedProducts = useSelector((state) => state.likedProducts.likedProducts)
  const isLiked = likedProducts.some((likedProduct) => likedProduct?.id === discountedProduct?.id)

  // Переключение состояния лайка продукта
  const toggleLiked = () => {
    if (isLiked) {
      dispatch(removeLikedProduct(discountedProduct))
    } else {
      dispatch(addLikedProduct(discountedProduct))
    }
  }

  return (
    <div className={`discount-popup ${isOpen ? 'open' : ''}`} onClick={handleBackdropClick}>
      {isOpen && discountedProduct && (
        <div className="discount-popup__content">
          <div className="discount-popup__title">
            <h3>50% discount on product of the day!</h3>
            <span className="discount-popup__close" onClick={handleClosePopup}>
              &times;
            </span>
          </div>
          <div className="discount-popup__product">
            <div className="discount-popup__img">
              <Link to={`/products/${discountedProduct.id}`}>
                <img src={`${BASE_URL}/${discountedProduct.image}`} alt={discountedProduct.name} />
              </Link>
              <span className="discount-popup__discont">-50%</span>
              <button className="discount-popup__icon" onClick={toggleLiked}>
                <img src={isLiked ? greenHeart : heart} alt="Add to favorites" />
              </button>
            </div>
            <div className="discount-popup__product-details">
              <Link to={`/products/${discountedProduct.id}`}>
                <h3 className="discount-popup__product-name">{discountedProduct.title}</h3>
              </Link>
              <div className="discount-popup__price">
                <p className="discount-popup__product-discounted-price">${discountedProduct.discountedPrice}</p>
                <p className="discount-popup__product-price">
                  <del>${discountedProduct.price}</del> {/* Отображение зачёркнутой оригинальной цены */}
                </p>
              </div>
            </div>
          </div>
          <button className="discount-popup__add-to-cart" onClick={handleAddToCart} disabled={isDiscountProductAdded}>
            {isDiscountProductAdded ? 'Discount already received!' : 'Add to cart'}
          </button>
        </div>
      )}
    </div>
  )
}

export default DiscountPopUp
