import ProductCard from "./ProductCard";
import PriceRow from "./PriceRow";
import TotalRow from "./TotalRow";
// import "../../../paymentInStich-sure/styles/order-summary.css"
import "../../../paymentInStich-sure/styles/order-summary.css"

const OrderSummary = () => {
  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>

      <ProductCard />

      <div className="summary-divider"></div>

      <PriceRow
        label="Subtotal"
        amount="₦500,000"
      />

      <PriceRow
        label="Shipping"
        amount="₦10,000"
      />

      <div className="summary-divider"></div>

      <TotalRow total="₦510,000" />
    </aside>
  );
};

export default OrderSummary;