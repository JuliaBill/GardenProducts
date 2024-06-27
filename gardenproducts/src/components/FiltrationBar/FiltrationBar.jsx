import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { maxPriceChange, minPriceChange, discountChange, sortedChange } from '../../store/slices/filterSlice'

import './FiltrationBar.scss'

const FiltrationBar = ({ showDiscountOption }) => {

  const dispatch = useDispatch()

  
  const { discounted } = useSelector((state) => state.filter)

  return (
    <form>
      {}
      <label htmlFor="price">
        Price
        {}
        <input
          type="number"
          id="minPrice"
          placeholder="from"
          onChange={(event) => dispatch(minPriceChange(event.target.value))}
        />
        {}
        <input
          type="number"
          id="maxPrice"
          placeholder="to"
          onChange={(event) => dispatch(maxPriceChange(event.target.value))}
        />
      </label>

      { }
      {showDiscountOption && (
        <label htmlFor="discount" className="discount">
          Discounted items
          {}
          <input
            type="checkbox"
            id="discount"
            checked={discounted}
            onChange={(event) => dispatch(discountChange(event.target.checked))}
          ></input>
          {}
          <span className="custom-checkbox"></span>
        </label>
      )}

      {}
      <label htmlFor="sort">
        Sorted
        {}
        <select id="sort" onChange={(event) => dispatch(sortedChange(event.target.value))}>
          <option>by default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="nameAz">Name: A to Z</option>
          <option value="nameZa">Name: Z to A</option>
        </select>
      </label>
    </form>
  )
}

export default FiltrationBar
