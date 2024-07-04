import React from 'react'
import './burgerMenu.scss' 

const BurgerMenu = ({ isActive, onClick, theme }) => {
  return (
    <button
      onClick={() => onClick()} 
      className={`header__menu ${theme} ${isActive === true ? 'active' : ''} ${isActive === false ? 'unactive' : ''}`} 
    >
      <span></span> 
    </button>
  )
}

export default BurgerMenu 