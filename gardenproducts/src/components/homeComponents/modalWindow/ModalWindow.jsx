import React from 'react'
import s from './ModalWindow.module.scss'

export default function ModalWindow({ onClose, children }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={s.modal} onClick={handleBackdropClick}>
      <div className={s.modalContent}>
        <div className={s.title}>
          <h3>Congratulations!</h3>
          <span className={s.close} onClick={onClose}>
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}
