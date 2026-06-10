import React from "react";
import NotFound from "../assets/gbenga/NotFound.jpg";

const NotFoun = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={NotFound} alt="" style={{ width: "50%", height: "70%" }} />
    </div>
  );
};

export default NotFoun;
