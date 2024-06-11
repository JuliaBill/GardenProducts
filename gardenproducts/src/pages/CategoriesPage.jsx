import React from 'react'

import CategoryContainer from '../components/CategoriesComponents/categoryContainer/CategoryContainer'

export default function CategoriesPage() {
  return (
    <section className={`container`}>
     
      <div className="grid">
        <h2 className="grid__title">Categories</h2>
        <div>
          <CategoryContainer limitDisplay={false} />
        </div>
      </div>
    </section>
  )
}
