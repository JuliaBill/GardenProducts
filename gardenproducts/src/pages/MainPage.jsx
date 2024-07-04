import { useSelector } from 'react-redux'

import CategoryContainer from './../components/CategoriesComponents/categoryContainer/CategoryContainer'
import DiscountForm from './../components/homeComponents/discountForm/DiscountForm'
import ProductContainer from './../components/homeComponents/productComponent/productContainer/ProductContainer'
import Banner from '../components/Banner/Banner'
import TitleBreadCrumbs from '../UI/titlebreadCrumbs/TitleBreadCrumbs'

export default function MainPage() {
  const { theme } = useSelector((state) => state.theme)

  const breadcrumbsCategories = [{ label: 'All categories', path: '/categories' }]

  const breadcrumbsSales = [{ label: 'All sales', path: '/sales' }]

  return (
    <div className={`main_page ${theme}`}>
      <Banner />

      <div className="container">
        <TitleBreadCrumbs title="Categories" breadcrumbs={breadcrumbsCategories} />

        <CategoryContainer />
        <DiscountForm />

        <TitleBreadCrumbs title="Sale" breadcrumbs={breadcrumbsSales} />
        <ProductContainer />
      </div>
    </div>
  )
}
