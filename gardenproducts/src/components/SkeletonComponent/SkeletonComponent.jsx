import React, { useEffect, useState } from 'react'
import styles from '../../components/SkeletonComponent/SkeletonComponent.module.css'

const SkeletonLoader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // Имитация загрузки в течение 4 секунд

    // Функция для анимации поочередного появления точек
    const animateDots = () => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'))
      }, 1000) // Интервал между появлением каждой точки (1000 мс)

      return () => clearInterval(interval)
    }

    animateDots() // Запуск анимации точек

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className={styles['skeleton-container']}>
        <h1>
          Products are loading
          {dots} {/* Отображение поочередных точек */}
        </h1>
        <div className={styles['skeleton-grid']}>
          {/* Создание сетки из квадратов ячеек */}
          {renderSkeletonSquares(9, styles['skeleton-square'])}
        </div>
      </div>
    )
  }

  // Если isLoading стал false, компонент возвращает null или другой контент
  return null
}

// Функция для рендеринга квадратов скелетона
const renderSkeletonSquares = (count, className) => {
  const squares = []
  for (let i = 0; i < count; i++) {
    squares.push(<div key={i} className={className}></div>)
  }
  return squares
}

export default SkeletonLoader
