import React from "react";
import "../../styles/Button.css";

const Button = ({ label, active, onClick }) => {
  return (
    <button
      className={`filter-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
