import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useFetchProductByIdQuery } from '../../store/slices/apiSlice.js' // Импорт хука для получения данных о продукте
import { BASE_URL } from '../../config.js' // Импорт базового URL
import { addLikedProduct, removeLikedProduct } from '../../store/slices/likedProductsSlice.js'

import s from './style.module.scss' // Импорт стилей модуля
import heart from '../../media/icons/heart.svg' // Импорт иконки сердца
import heartWhite from '../../media/icons/heartWhite.svg'
import greenHeart from '../../media/icons/greenHeart.svg'
import { addProduct } from '../../store/slices/cartSlice.js'
import BtnCard, { ButtonTypes } from '../../UI/BtnCard/BtnCart.jsx'

// Компонент для модального окна
const Modal = ({ src, alt, onClose }) => (
  <div className={s.modalBackdrop} onClick={onClose}>
    <img src={src} alt={alt} className={s.modalImage} /> {/* Изображение в модальном окне */}
  </div>
)

export default function SingleProductComponent() {
  // Функциональный компонент для отображения информации о продукте

  const { id } = useParams() // Получение параметра id из URL

  // Деструктуризация данных о продукте из хука useFetchProductByIdQuery
  const { data: [product] = [], isLoading, isError } = useFetchProductByIdQuery(id)

  const { theme } = useSelector((state) => state.theme)
  const likedProducts = useSelector((state) => state.likedProducts.likedProducts)
  const dispatch = useDispatch()
  const [isAdded, setIsAdded] = useState(false)
  const [isHeartClicked, setIsHeartClicked] = useState(false)

  useEffect(() => {
    const isProductLiked = likedProducts.some((likedProduct) => likedProduct.id === product?.id)
    setIsHeartClicked(isProductLiked)
  }, [likedProducts, product])

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addProduct({ ...product, quantity: 1 })) // Предполагаем, что el - это объект товара с нужными полями
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  // Состояния для управления модальным окном и количеством товаров
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  // Состояние для управления обрезанным описанием
  const [isTruncated, setIsTruncated] = useState(true)

  // Обрезанное описание продукта
  const truncatedDescription = `${product?.description.substring(0, 300)}...`

  // Функция для переключения обрезанного описания
  const toggleTruncate = () => setIsTruncated(!isTruncated)

  const toggleLiked = () => {
    setIsHeartClicked(!isHeartClicked)
    if (!isHeartClicked) {
      dispatch(addLikedProduct(product))
    } else {
      dispatch(removeLikedProduct(product))
    }
  }

  useEffect(() => {
    localStorage.setItem(`isHeartClicked_${id}`, JSON.stringify(isHeartClicked))
  }, [id, isHeartClicked])

  // Вывод индикатора загрузки при загрузке данных о продукте
  if (isLoading) return <p>Loading...</p>
  // Вывод сообщения об ошибке при ошибке загрузки данных или если продукт не найден
  if (isError || !product) return <p>Product not found or error loading the product.</p>

  // Функции для управления количеством товаров в корзине
  const increaseCount = () => setCount((prev) => prev + 1)
  const decreaseCount = () => setCount((prev) => (prev > 0 ? prev - 1 : 0))

  // Формирование ссылки на изображение продукта
  const imgLink = `${BASE_URL}${product.image}`
  // Расчет скидки в процентах
  const discountPercent = product.discont_price ? ((product.price - product.discont_price) / product.price) * 100 : 0

  // Функции для открытия и закрытия модального окна
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Возвращение JSX-разметки для отображения информации о продукте
  return (
    <>
      <div className={s.card}>
        {/* Блок с левой частью продукта */}
        <div className={s.leftBlock}>
          <img src={imgLink} alt="productImage" className={s.productImg} onClick={openModal} />
          {/* Отображение скидки на изображении продукта */}
          {product.discont_price && (
            <div className={s.discountOnImage}>
              <p className={s.discountText}>-{discountPercent.toFixed(0)}%</p>
            </div>
          )}
        </div>
        {/* Блок с заголовком и иконкой "Добавить в избранное" */}
        <div className={s.headerContainer}>
          <p className={s.header}>{product.title}</p>
          <button className={s.icon_button} onClick={toggleLiked}>
            <img src={isHeartClicked ? greenHeart : theme === 'light' ? heart : heartWhite} alt="Add to favorites" />
          </button>
        </div>
        {/* Блок с ценой и скидкой */}
        <div className={s.priceBlock}>
          <p className={s.priceP}>{product.discont_price ? `$${product.discont_price}` : `$${product.price}`}</p>
          {product.discont_price && <p className={s.oldPriceP}>{`$${product.price}`}</p>}
          {product.discont_price && (
            <div className={s.percentDiscount}>
              <p className={s.percentDiscountP}>-{discountPercent.toFixed(0)}%</p>
            </div>
          )}
        </div>
        {/* Блок с кнопками для управления количеством товаров */}
        <div className={s.buttonsContainer}>
          <div className={s.countButtonContainer}>
            <button className={s.countButton} onClick={decreaseCount}>
              -
            </button>
            <p className={s.countValue}>{count}</p>
            <button className={s.countButton} onClick={increaseCount}>
              +
            </button>
          </div>
          <button
            className={`${s.addToCartButton} ${isAdded ? s.addedButton : s.notAddedButton}`}
            disabled={count === 0} // Добавляем атрибут disabled, если количество товара равно 0
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
        {/* Блок с описанием продукта */}
        <div className={s.descriptionBlock}>
          <p className={s.descriptionHeader}>Description</p>
          <p className={s.descriptionText}>{isTruncated ? truncatedDescription : product.description}</p>
          {/* Кнопка для переключения обрезанного описания */}
          {isTruncated && (
            <a className="readMore" onClick={toggleTruncate}>
              Read more
            </a>
          )}
        </div>
        {/* Модальное окно */}
        {isModalOpen && <Modal src={imgLink} alt={product.title} onClose={closeModal} />}
      </div>
    </>
  )
}

