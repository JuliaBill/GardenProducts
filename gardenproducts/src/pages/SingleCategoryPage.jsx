import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFetchCategoryByNameQuery } from '../store/slices/apiSlice'
import { useFiltration } from '../utils/useFiltration'

import FiltrationBar from './../components/FiltrationBar/FiltrationBar'
import ProductItem from '../components/homeComponents/productComponent/productsItem/ProductsItem'
import BreadCrumbs from './../components/BreadCrumbs/BreadCrumbs'
import SkeletonLoader from './../components/SkeletonComponent/SkeletonComponent'

const SingleCategoryPage = () => {
  const { id } = useParams()

  const { data: category, isLoading, isError } = useFetchCategoryByNameQuery(id)

  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter)

  const products = useFiltration(category?.data, minPrice, maxPrice, sorted)

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
          <h2 className="grid__title">{category?.category.title}</h2>
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
      <BreadCrumbs />
      <div className="grid">
        <h2 className="grid__title">{category?.category.title}</h2>

        <FiltrationBar showDiscountOption={true} />

        <ul className="grid__wrapper">
          {products && products.map((product) => <ProductItem key={product.id} el={product} />)}
        </ul>
      </div>
    </section>
  )
}

export default SingleCategoryPage
