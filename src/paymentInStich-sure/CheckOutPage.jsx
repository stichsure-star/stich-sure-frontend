import CheckoutForm from "../components/checkout/form/CheckoutForm";
import OrderSummary from "../components/checkout/summary/OrderSummary";
import "./styles/checkout.css"

const CheckoutPage = () => {
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <CheckoutForm />
        <OrderSummary/>
      </div>
    </main>
  );
};

export default CheckoutPage;