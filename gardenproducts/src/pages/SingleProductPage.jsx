import React from 'react'
import SingleProductComponent from '../components/SingleProductComponent/SingleProductComponent'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'

const SingleProduct = () => {
  return (
    <section className="container">
      <BreadCrumbs />
      <SingleProductComponent />
    </section>
  )
}

export default SingleProduct
