import React from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFetchCategoryByNameQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'

import FiltrationBar from './../components/FiltrationBar/FiltrationBar'
import ProductItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import BreadCrumbs from './../components/BreadCrumbs/BreadCrumbs'

const SingleCategoryPage = () => {
  const { id } = useParams()

  const { data: category, isLoading, isError } = useFetchCategoryByNameQuery(id)

  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  const products = useFiltration(category?.data, minPrice, maxPrice, sorted)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading category.</div>
  
  return (
    <section className="container">
      <BreadCrumbs />
      <div className="grid">
        <h2 className="grid__title">{category.category.title}</h2>

        <FiltrationBar showDiscountOption={true} />

        <ul className="grid__wrapper">
          {products && products.map((product) => <ProductItem key={product.id} el={product} />)}
        </ul>
      </div>
    </section>
  )
}

export default SingleCategoryPage

