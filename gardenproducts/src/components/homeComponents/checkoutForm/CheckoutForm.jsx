import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addSale } from '../../../utils/sale'

import s from '../checkoutForm/CheckoutForm.module.css'

export default function CheckoutForm({ classInput, classBtn, txtBtn, handleDiscountSubmit, handleOrderSubmit }) {
  const [resp, setResp] = useState({})
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' })

  const submit = (new_product_obj) => {
    reset()
    addSale(new_product_obj, setResp)
    handleDiscountSubmit()
    handleOrderSubmit()
    setShowModal(true)
  }

  return (
    <form className={s.form_container} onSubmit={handleSubmit(submit)}>
      <label className={s.input_container}>
        <p className={s.error_message}>{errors.name?.message}</p>
        <input
          type="text"
          placeholder="Name"
          {...register('name', {
            required: '*Name is required',
          })}
          className={`${classInput} ${s.input}`}
        />

        <p className={s.error_message}>{errors.phone?.message}</p>
        <input
          type="tel"
          placeholder="Phone number"
          className={`${classInput} ${s.input}`}
          {...register('phone', {
            required: '*Phone number is required',
            pattern: {
              value: /^\d+$/,
              message: 'Please enter only digits',
            },
            minLength: {
              value: 13,
              message: 'Phone number must be at least 13 characters',
            },
            maxLength: {
              value: 13,
              message: 'Phone number must be at most 13 characters',
            },
          })}
        />

        <p className={s.error_message}>{errors.email?.message}</p>
        <input
          type="email"
          placeholder="Email"
          className={`${classInput} ${s.input}`}
          {...register('email', {
            required: '*Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email',
            },
          })}
        />
      </label>

      <button className={`${classBtn} ${s.getDiscount}`}>{txtBtn}</button>
    </form>
  )
}
