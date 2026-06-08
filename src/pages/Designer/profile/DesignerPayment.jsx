import "../../../styles/designer-payment.css"

const DesignerPayment = () => {
  return (
    <main className="designer-payment-page">
      <section className="designer-payment-panel">
        <h1>Profile Settings</h1>

        <form className="designer-payment-form">
          <div className="payment-current-account">
            <label className="payment-field">
            <span>Current Bank Account</span>
            <input type="text" placeholder="Bank Account"/>
            </label>
          </div>

          <label className="payment-field">
            <span>Bank Name</span>
            <input type="text" placeholder="Gtb" />
          </label>

          <label className="payment-field">
            <span>Account Number</span>
            <input type="text" placeholder="0123456789" inputMode="numeric" />
          </label>

          <button type="submit" className="payment-update-button">
            Update Payment Info
          </button>
        </form>
      </section>
    </main>
  );
};

export default DesignerPayment;