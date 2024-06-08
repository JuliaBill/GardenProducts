import React, { useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import img_discount_form from "../../../media/images/Discount.svg";
import s from "../discountForm/DiscountForm.module.scss";
import CheckoutForm from "../checkoutForm/CheckoutForm";

export default function DiscountForm() {
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("Get a discount");

  const handleDiscountSubmit = (e) => {
    console.log("Form submitted");
    setShowModal(true);
    setButtonText("Request Submitted");
  };

  return (
    <div className={s.form_wrapper} id="discount">
      <h2 className={s.form_text}>5% off on the first order</h2>
      <div className={s.inform}>
        <img
          src={img_discount_form}
          alt="Discount form"
          className={s.discount_img}
        />
        <div className={s.check_block}>
          <CheckoutForm
            handleOrderSubmit={() => {}}
            handleDiscountSubmit={handleDiscountSubmit}
            classInput={s.discount_input}
            classBtn={s.discount_btn}
            txtBtn={buttonText}
            cartModalWindow={ModalWindow}
          />
        </div>
      </div>
      {showModal && (
        <ModalWindow onClose={() => setShowModal(false)}>
          <p className={s.congrats}>Your discount of 5% has been received!</p>
        </ModalWindow>
      )}
    </div>
  );
}
