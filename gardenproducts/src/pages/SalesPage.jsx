import React from 'react'
import { useFetchAllProductsQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import ProductsItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import FiltrationBar from '../components/FiltrationBar/FiltrationBar'

export default function SalePage() {
  const { data, isLoading, isError } = useFetchAllProductsQuery()

  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  const discountedProducts = data?.filter((product) => product.discont_price) || []

  const products = useFiltration(discountedProducts, minPrice, maxPrice, sorted)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading products.</p>

  return (
    <section className="container">
      <BreadCrumbs />
      <div className="grid">
        <h2 className="grid__title">Discounted items</h2>
        <FiltrationBar showDiscountOption={false} />
        <ul className="grid__wrapper">
          {products && products.map((product) => <ProductsItem key={product.id} el={product} />)}
        </ul>
      </div>
    </section>
  )
}