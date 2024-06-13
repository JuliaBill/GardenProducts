import React, { useState, useEffect } from 'react'
import { useFetchAllProductsQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'
import { useSelector } from 'react-redux'
import FiltrationBar from '../components/FiltrationBar/FiltrationBar'
import ProductsItem from "../components/homeComponents/productComponent/productsItem/ProductsItem"
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'

export default function ProductsPage() {
  const { data } = useFetchAllProductsQuery()

  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  const products = useFiltration(data, minPrice, maxPrice, sorted)


  return (
    <section className="container">
      <BreadCrumbs />
      <div className="grid">
        <h2 className="grid__title">All products</h2>

        <FiltrationBar showDiscountOption={true} />

        <ul className="grid__wrapper">
          {products.map((product) => (
            <ProductsItem key={product.id} el={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}