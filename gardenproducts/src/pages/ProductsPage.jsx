import React, { useState, useEffect } from 'react'
import { useFetchAllProductsQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'
import { useSelector } from 'react-redux'

import ProductsItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import FiltrationBar from '../components/FiltrationBar/FiltrationBar'
import SkeletonLoader from './../components/SkeletonComponent/SkeletonComponent'

export default function ProductsPage() {
  const { data, isLoading, isError } = useFetchAllProductsQuery()

  // Получаем значения фильтров из хранилища Redux
  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  // Фильтруем продукты с помощью утилиты useFiltration
  const products = useFiltration(data, minPrice, maxPrice, sorted)

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
          <h2 className="grid__title">All products</h2>
          {/* Отображаем панель фильтрации */}
          <FiltrationBar showDiscountOption={true} />
          {/* Отображаем скелетон списка продуктов */}
          <SkeletonLoader />
        </div>
      </section>
    )
  }

  // Если isLoading стал false и нет ошибок загрузки, отображаем фактические данные
  return (
    <section className="container">
      {/* Отображаем хлебные крошки */}
      <BreadCrumbs />
      <div className="grid">
        {/* Отображаем заголовок страницы */}
        <h2 className="grid__title">All products</h2>
        {/* Отображаем панель фильтрации */}
        <FiltrationBar showDiscountOption={true} />
        {/* Отображаем список фактических продуктов */}
        <ul className="grid__wrapper">
          {products.map((product) => (
            <ProductsItem key={product.id} el={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
