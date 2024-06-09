import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchAllProductsQuery } from '../../store/slices/apiSlice'
import { BASE_URL } from '../../config'
import { Link } from 'react-router-dom'
import heart from '../../media/icons/heart.svg' 
import greenHeart from '../../media/icons/greenHeart.svg'
import './DiscountPopUp.scss'

const DiscountPopUp = ({ onClose }) => {
  const dispatch = useDispatch()
  const { data: products } = useFetchAllProductsQuery() 
  const [discountedProduct, setDiscountedProduct] = useState(null) 

  return (
    <div className={`discount-popup `}>
      { discountedProduct && (
        <div className="discount-popup__content">
          <div className="discount-popup__title">
            <h3>50% discount on product of the day!</h3>
            <span className="discount-popup__close" onClick>
              &times;
            </span>
          </div>
          <div className="discount-popup__product">
            <div className="discount-popup__img">
              <Link to={`/products/${discountedProduct.id}`}>
                <img src={`${BASE_URL}/${discountedProduct.image}`} alt={discountedProduct.name} />
              </Link>
              <span className="discount-popup__discont">-50%</span>
              <button className="discount-popup__icon" >
                <img src alt="Add to favorites" />
              </button>
            </div>
            <div className="discount-popup__product-details">
              <Link to={`/products/${discountedProduct.id}`}>
                <h3 className="discount-popup__product-name">{discountedProduct.title}</h3>
              </Link>
              <div className="discount-popup__price">
                <p className="discount-popup__product-discounted-price">${discountedProduct.discountedPrice}</p>
                <p className="discount-popup__product-price">
                  
                </p>
              </div>
            </div>
          </div>
          <button className="discount-popup__add-to-cart" >
            
          </button>
        </div>
      )}
    </div>
  )
}

export default DiscountPopUp
