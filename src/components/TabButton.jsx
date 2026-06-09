import React from "react";
import "../styles/TabButton.css";

const TabButton = ({ label, active, onClick }) => {
  return (
    <button className={`tab-btn ${active ? "active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TabButton;
