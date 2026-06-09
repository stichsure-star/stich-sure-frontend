const PriceRow = ({ label, amount }) => {
  return (
    <div className="price-row">
      <span>{label}</span>
      <span>{amount}</span>
    </div>
  );
};

export default PriceRow;