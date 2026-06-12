import PersonalInfoFields from "./PersonalInfoFields";
import AddressFields from "./AddressFields";
import SaveInfoCheckbox from "./SaveInfoCheckbox";
// import PaymentMethod from "./PaymentMethod";

// import CheckoutButton from "../shared/CheckoutButton";
import CheckoutButton from "../Shared/CheckoutButton";
// import SectionCard from "../shared/SectionCard";
import SectionCard from "../Shared/SectionCard";
import "../../../paymentInStich-sure/styles/checkoutform.css"


const CheckoutForm = () => {
  return (
    <section className="checkout-form">
      <h2>Checkout Details</h2>

      <form className="checkout-form-content">

        <SectionCard title="Personal Information">
          <PersonalInfoFields />
        </SectionCard>

        <SectionCard title="Address Information">
          <AddressFields />
        </SectionCard>

        <SaveInfoCheckbox />

        {/* <SectionCard title="Payment Method">
          <PaymentMethod />
        </SectionCard> */}

        <CheckoutButton />

      </form>
    </section>
  );
};

export default CheckoutForm;