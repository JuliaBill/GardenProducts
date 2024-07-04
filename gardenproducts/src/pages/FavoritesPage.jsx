import React from 'react'
import { useSelector } from 'react-redux'
import { useFiltration } from './../utils/useFiltration'

import ProductItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import FiltrationBar from '../components/FiltrationBar/FiltrationBar'

const FavoritesPage = () => {
  const likedProducts = useSelector((state) => state.likedProducts.likedProducts)

  const { minPrice, maxPrice, sorted } = useSelector((state) => state.filter)

  const filteredProducts = useFiltration(likedProducts, minPrice, maxPrice, sorted)

  return (
    <section className="container">
      <BreadCrumbs /> 
      <div className="grid">
        <h2 className="grid__title">Liked products</h2> 
        <FiltrationBar showDiscountOption={false} />
        <ul className="grid__wrapper">
          {filteredProducts &&
            filteredProducts.map((product) => product && <ProductItem key={product.id} el={product} />)}
        </ul>
      </div>
    </section>
  )
}

export default FavoritesPage
