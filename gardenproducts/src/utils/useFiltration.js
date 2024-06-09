import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilter } from '../store/slices/filterSlice'

export const useFiltration = (data) => {
  const [products, setProducts] = useState(data)
  const { discounted, minPrice, maxPrice, sorted } = useSelector((state) => state.filter)

  const dispatch = useDispatch()

  useEffect(() => {
    // Сброс фильтров при загрузке новой страницы или перезагрузке текущей страницы
    dispatch(resetFilter())
  }, [dispatch])

  useEffect(() => {
    const filterProducts = () => {
      if (!data) return

      let filteredProducts = data.filter((product) => {
        return (!minPrice || product.price >= Number(minPrice)) && (!maxPrice || product.price <= Number(maxPrice))
      })

      // Apply discount filter if necessary
      if (discounted) {
        filteredProducts = filteredProducts.filter((product) => product.discont_price)
      }

      // Sorting
      const sortedProducts =
        sorted === '' || sorted === 'By default'
          ? filteredProducts
          : sorted === 'asc'
          ? [...filteredProducts].sort((a, b) => a.price - b.price)
          : sorted === 'desc'
          ? [...filteredProducts].sort((a, b) => b.price - a.price)
          : sorted === 'nameAz'
          ? [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
          : sorted === 'nameZa'
          ? [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title))
          : filteredProducts

      setProducts(sortedProducts)
    }

    const timerId = setTimeout(filterProducts, 300)
    return () => clearTimeout(timerId)
  }, [data, minPrice, maxPrice, sorted, discounted])

  return products
}