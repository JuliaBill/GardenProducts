import React from 'react'
import { useFetchCategoriesQuery } from '../../../store/slices/apiSlice'

import s from './CategoryContainer.module.css'
import CategoryItem from '../categoryItem/CategoryItem'

const CategoryContainer = ({ limitDisplay = true }) => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery()
  console.log(categories)

  if (isLoading) return <p>Loading categories...</p>
  if (error) return <p>Error loading categories: {error.message}</p>

  // Проверяем, что categories действительно содержит данные
  if (!categories) return <p>No categories to display</p>

  // Ограничиваем количество отображаемых категорий до первых четырех
  const displayedCategories = limitDisplay ? categories.slice(0, 4) : categories

  return (
    <div className={s.categories_container}>
      {displayedCategories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  )
}

export default CategoryContainer
