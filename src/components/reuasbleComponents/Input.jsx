const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  onClick,
}) => {
  return (
    <div className={`form-group ${className || ""}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
