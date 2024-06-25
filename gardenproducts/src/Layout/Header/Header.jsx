import React, { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/slices/themeSlice'

import './Header.scss'
import '../../style/app.scss'

// import { SlHeart as FavIcon } from 'react-icons/sl'
import logo from '../../media/icons/logo.svg'
import dayToggle from '../../media/icons/modeDay.svg'
import nightToggle from '../../media/icons/modeNight.svg'
import shoppingBag from '../../media/icons/shoppingBag1.svg'
import shoppingBagWhite from '../../media/icons/shoppingBagWhite.svg'
import heart from '../../media/icons/heart.svg'
import heartWhite from '../../media/icons/heartWhite.svg'

import DiscountButton from '../../components/DiscountButton/DiscountButton'
import BurgerMenu from './../../components/BurgerMenu/BurgerMenu'
import DiscountPopUp from '../../components/DiscountPopUp/DiscountPopUp'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDiscountButtonClick = () => {
    setIsModalOpen(true)
  }

  const cartProducts = useSelector((state) => state.cart.products)
  const cartProductsCount = cartProducts.length

  const likedProducts = useSelector((state) => state.likedProducts.likedProducts)
  const likedProductsCount = likedProducts.length

  const { theme } = useSelector((state) => state.theme)

  const location = useLocation() // Получаем текущий URL

  const dispatch = useDispatch()

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const [isOpen, setIsOpen] = useState() //используем useState для открытого и закрытого состояния бургер-меню

  const closeMenu = () => {
    setIsOpen(false)
  } // автоматическое закрытие бургер-меню при нажатии на категорию

  const activeLink = 'header__navigation__ul-nav-link header__navigation__ul-nav-link-active'
  const normalLink = 'header__navigation__ul-nav-link' // константы для добавления активного и неактивного класса навигации

  const getLinkClass = (path) => {
    return location.pathname === path ? activeLink : normalLink
  } // функциия для активной вкладки

  return (
    <div className="wrapper">
      <header className={`header ${theme} container`}>
        <div className="header__logo-section">
          <NavLink to="/">
            <img className="header__logo-section-logo" src={logo} alt="Logo" />
          </NavLink>
          <img
            src={theme === 'light' ? dayToggle : nightToggle}
            alt="Theme"
            className="header__logo-section__btnChangeTheme"
            onClick={handleThemeToggle}
          />
        </div>
        <nav className={`header__navigation ${theme} ${isOpen ? 'active' : ''}`}>
          <DiscountButton className="discount-button" onClick={handleDiscountButtonClick} />
          <ul className={`header__navigation__ul ${theme}`}>
            <li className="header__navigation__ul-item">
              <NavLink to="/" className={`${getLinkClass('/')} ${theme}`} onClick={closeMenu}>
                Main Page
              </NavLink>
            </li>
            <li className="header__navigation__ul-item">
              <NavLink to="/categories" className={`${getLinkClass('/categories')} ${theme}`} onClick={closeMenu}>
                Categories
              </NavLink>
            </li>
            <li className="header__navigation__ul-item">
              <NavLink to="/products" className={`${getLinkClass('/products')} ${theme}`} onClick={closeMenu}>
                All products
              </NavLink>
            </li>
            <li className="header__navigation__ul-item">
              <NavLink to="/sales" className={`${getLinkClass('/sales')} ${theme}`} onClick={closeMenu}>
                All sales
              </NavLink>
            </li>
          </ul>
        </nav>
        <ul className="header__action__ul">
          <li className="header__action__ul-item">
            <NavLink to="/favorites" className={`header__action__ul-item icon ${theme}`}>
              <div className="cart-count-container">
                {likedProductsCount > 0 && <span className="cart-count heart">{likedProductsCount}</span>}
                <img src={theme === 'light' ? heart : heartWhite} alt="favourites" />
              </div>
            </NavLink>
          </li>
          <li className="header__action__ul-item">
            <NavLink to="/cart" className={`header__action__ul-item icon ${theme}`}>
              <div className="cart-count-container">
                {cartProductsCount > 0 && <span className="cart-count cart">{cartProductsCount}</span>}
                <img src={theme === 'light' ? shoppingBag : shoppingBagWhite} alt="cart" />
              </div>
            </NavLink>
          </li>
          <li className="header__action__ul-item">
            <BurgerMenu theme={theme} isActive={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </li>
        </ul>
      </header>
      {isModalOpen && <DiscountPopUp onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Header
