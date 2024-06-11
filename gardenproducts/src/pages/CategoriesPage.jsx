import React from 'react'

import CategoryContainer from '../components/CategoriesComponents/categoryContainer/CategoryContainer'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'

export default function CategoriesPage() {
  return (
    <section className={`container`}>
      <BreadCrumbs />
      <div className="grid">
        <h2 className="grid__title">Categories</h2>
        <div>
          <CategoryContainer limitDisplay={false} />
        </div>
      </div>
    </section>
  )
}
