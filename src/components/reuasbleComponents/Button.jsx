import React from "react";

const Button = ({ text, onClick, className, type, disabled, onChange }) => {
  return (
    <button
      type={type}
      className={`custom-button ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      onChange={onChange}
    >
      {text}
    </button>
  );
};

export default Button;
