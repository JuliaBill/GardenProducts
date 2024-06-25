import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchAllProductsQuery } from '../../store/slices/apiSlice'
import { addProduct } from '../../store/slices/cartSlice'
import { BASE_URL } from '../../config'
import { addLikedProduct, removeLikedProduct } from '../../store/slices/likedProductsSlice'
import { Link } from 'react-router-dom'
import heart from '../../media/icons/heart.svg' 
import greenHeart from '../../media/icons/greenHeart.svg'
import './DiscountPopUp.scss'

const DiscountPopUp = ({ onClose }) => {
  const dispatch = useDispatch()
  const { data: products } = useFetchAllProductsQuery()
  const [discountedProduct, setDiscountedProduct] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isDiscountProductAdded, setIsDiscountProductAdded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    const today = new Date().toDateString()
    const lastDiscountDate = localStorage.getItem('lastDiscountDate')

    if (lastDiscountDate !== today) {
      setIsDiscountProductAdded(false)
    } else {
      setIsDiscountProductAdded(true)
    }
  }, [])

  useEffect(() => {
    if (products && products.length > 0) {
      const nonDiscountedProducts = products.filter((product) => product.discont_price === null)
      if (nonDiscountedProducts.length > 0 && !isDiscountProductAdded) {
        const randomProduct = nonDiscountedProducts[Math.floor(Math.random() * nonDiscountedProducts.length)]
        setDiscountedProduct({
          ...randomProduct,
          discountedPrice: +(randomProduct.price * 0.5).toFixed(2),
        })
        setIsOpen(true)
      }
    }
  }, [products, isDiscountProductAdded])

  const handleAddToCart = () => {
    if (discountedProduct) {
      const discountedProductWithOldPrice = {
        ...discountedProduct,
        quantity: 1,
        price: discountedProduct.discountedPrice,
        oldPrice: discountedProduct.price,
      }
      dispatch(addProduct(discountedProductWithOldPrice))

      setIsDiscountProductAdded(true)

      const today = new Date().toDateString()
      localStorage.setItem('lastDiscountDate', today)

      setIsModalOpen(false)
    }
  }

  const handleClosePopup = () => {
    setIsOpen(false)
    setDiscountedProduct(null)
  }

  const likedProducts = useSelector((state) => state.likedProducts.likedProducts)
  const isLiked = likedProducts.some((likedProduct) => likedProduct?.id === discountedProduct?.id)

  
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
                  <del>${discountedProduct.price}</del>
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
