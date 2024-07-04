import React, { useState, useEffect } from 'react'
import { useFetchAllProductsQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import ProductsItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import FiltrationBar from '../components/FiltrationBar/FiltrationBar'
import SkeletonLoader from './../components/SkeletonComponent/SkeletonComponent'

export default function SalePage() {
  const { data, isLoading, isError } = useFetchAllProductsQuery()

  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  const discountedProducts = data?.filter((product) => product.discont_price) || []

  const products = useFiltration(discountedProducts, minPrice, maxPrice, sorted)

  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isError) {
    return <p>Error loading products.</p>
  }

  // Показываем скелетон в течение 4 секунд или пока данные загружаются
  if (isLoading || showSkeleton) {
    return (
      <section className="container">
        {/* Отображаем хлебные крошки */}
        <BreadCrumbs />
        <div className="grid">
          {/* Отображаем заголовок страницы */}
          <h2 className="grid__title">Discounted items</h2>
          {/* Отображаем панель фильтрации */}
          <FiltrationBar showDiscountOption={false} />
          {/* Отображаем скелетон списка продуктов */}
          <SkeletonLoader />
        </div>
      </section>
    )
  }

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
