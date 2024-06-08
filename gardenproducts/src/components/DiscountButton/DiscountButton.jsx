// DiscountButton.js
import React from "react";
import "./DiscountButton.scss";

const DiscountButton = ({ onClick }) => {
  return (
    <button className="discount-button" onClick={onClick}>
      1 day discount!
    </button>
  );
};

export default DiscountButton;
