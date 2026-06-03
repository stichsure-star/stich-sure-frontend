import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { useState } from "react";

import "../../styles/InputField.css"

const  InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
    return (
    <div className="input_group">
      <label>{label}</label>
     <div className="input_wrapper">

  <input
    type={
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type
    }
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />

  {type === "password" && (
    <span
      className="eye_icon"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? (
        <IoIosEye />
      ) : (
        <IoIosEyeOff />
      )}
    </span>
  )}

</div>
    </div>
  );
}

 

export default InputField;