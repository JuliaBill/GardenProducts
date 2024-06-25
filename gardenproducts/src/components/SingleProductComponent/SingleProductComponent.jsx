import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useFetchProductByIdQuery } from '../../store/slices/apiSlice.js'
import { BASE_URL } from '../../config.js' 
import { addLikedProduct, removeLikedProduct } from '../../store/slices/likedProductsSlice.js'
import s from './style.module.scss' 
import heart from '../../media/icons/heart.svg' 
import heartWhite from '../../media/icons/heartWhite.svg'
import greenHeart from '../../media/icons/greenHeart.svg'
import { addProduct } from '../../store/slices/cartSlice.js'
import BtnCard, { ButtonTypes } from '../../UI/BtnCard/BtnCart.jsx'

const Modal = ({ src, alt, onClose }) => (
  <div className={s.modalBackdrop} onClick={onClose}>
    <img src={src} alt={alt} className={s.modalImage} />
  </div>
)

export default function SingleProductComponent() {

  const { id } = useParams() 

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
    dispatch(addProduct({ ...product, quantity: 1 }))
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  const [isTruncated, setIsTruncated] = useState(true)

  const truncatedDescription = `${product?.description.substring(0, 300)}...`

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

  if (isLoading) return <p>Loading...</p>
  if (isError || !product) return <p>Product not found or error loading the product.</p>

  const increaseCount = () => setCount((prev) => prev + 1)
  const decreaseCount = () => setCount((prev) => (prev > 0 ? prev - 1 : 0))

  const imgLink = `${BASE_URL}${product.image}`
  const discountPercent = product.discont_price ? ((product.price - product.discont_price) / product.price) * 100 : 0

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className={s.card}>
        <div className={s.leftBlock}>
          <img src={imgLink} alt="productImage" className={s.productImg} onClick={openModal} />
          {product.discont_price && (
            <div className={s.discountOnImage}>
              <p className={s.discountText}>-{discountPercent.toFixed(0)}%</p>
            </div>
          )}
        </div>

        <div className={s.headerContainer}>
          <p className={s.header}>{product.title}</p>
          <button className={s.icon_button} onClick={toggleLiked}>
            <img />
          </button>
        </div>

        <div className={s.priceBlock}>
          <p className={s.priceP}>{product.discont_price ? `$${product.discont_price}` : `$${product.price}`}</p>
          {product.discont_price && <p className={s.oldPriceP}>{`$${product.price}`}</p>}
          {product.discont_price && (
            <div className={s.percentDiscount}>
              <p className={s.percentDiscountP}>-{discountPercent.toFixed(0)}%</p>
            </div>
          )}
        </div>

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
            disabled={count === 0}
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
        <div className={s.descriptionBlock}>
          <p className={s.descriptionHeader}>Description</p>
          <p className={s.descriptionText}>{isTruncated ? truncatedDescription : product.description}</p>
          {isTruncated && (
            <a className="readMore" onClick={toggleTruncate}>
              Read more
            </a>
          )}
        </div>
        {isModalOpen && <Modal src={imgLink} alt={product.title} onClose={closeModal} />}
      </div>
    </>
  )
}
