import React, { useEffect, useState , } from "react";
import { useLocation, useParams , useNavigate} from "react-router-dom";
// import "../styles/Bili.css";
// import "../styles/checkout.css"
import "../styles/money-checkout.css"
import { authApi } from "../config/auth";
import productImage from "../assets/gbenga/Gown.png";

const CheckOut2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [orderId, setOrder] = useState({});
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  let finalState = location.state;
  console.log("finalState", finalState);

  

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    email: "",
  });

  const handleCalculateDelivery = () => {
  if (
    !formData.address ||
    !formData.city ||
    !formData.state ||
    !formData.country
  ) {
    alert("Please complete your address information");
    return;
  }

  if (saveInfo) {
    localStorage.setItem(
      "checkoutInfo",
      JSON.stringify(formData)
    );
  }

  setShippingCalculated(true);
};

useEffect(() => {
  const savedInfo = localStorage.getItem("checkoutInfo");

  if (savedInfo) {
    setFormData(JSON.parse(savedInfo));
  }
}, []);

const isAddressComplete =
  formData.address &&
  formData.city &&
  formData.state &&
  formData.country;

  if (!finalState) {
    try {
      const stored = sessionStorage.getItem("checkoutState");
      finalState = stored ? JSON.parse(stored) : {};
    } catch (e) {
      finalState = {};
    }
  }

  const subtotal = Number(finalState.amount) || 5000000;
  const shipping = shippingCalculated ? 10000 : 0;
  const total = subtotal + shipping;
  const formatNaira = (value) =>
    `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(value)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFullAddress = () =>
    `${formData.address || "Not provided"}, ${formData.city || "Not provided"}, ${
      formData.state || "Not provided"
    }, ${formData.country || "Not provided"}`;

  const handleSubmit = async () => {
    const payload = {
      amount: finalState.amount,
      designId: finalState.designId,
      designerId: finalState.designerId,
      itemName: finalState.itemName,
      requestId: finalState.requestId,
      address: getFullAddress(),
    };
    console.log("payloaded", payload);
    try {
      const response = await authApi.profileOrder(payload);
      console.log("Order response:", response);
      setAppy(response.data);
      setOrder(response.data.data?.id || response.data.id);
    } catch (error) {
      console.log("Order error:", error);
    }
  };
  console.log("appy", Appy);
  console.log("orderId", Appy.data?.id);

  const finalPayment = async () => {
    const payload = {
      orderId,
      deliveryAddress: getFullAddress(),
      email: formData.email,
    };
    console.log("payload", payload);
    try {
      const response = await authApi.finalPay(payload);
      console.log("responsed", response);
      navigate("/checkoutpayment");
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
    console.log("CheckOutPage mounted with finalState:", finalState);
  }, []);

  console.log("CheckOutPage - Merged State (holding + response):", finalState);

  return (
    <div className="checkout-screen">
      <main className="checkout-main">
        <div className="checkout-page">
          <div className="checkout-left">
            <div className="info-card">
              <h4>Personal Information</h4>

              <input placeholder="Sonayon Blessing" />
              <input
                name="email"
                placeholder="peculiarsewanu@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              <input placeholder="07056491653" />
            </div>

            <div className="info-card">
              <h4>Address Information</h4>

              <input
                name="address"
                placeholder="60, Idowu Street"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Nigeria"
                value={formData.country}
                onChange={handleChange}
              />

              <div className="location-row">
                <input
                  name="city"
                  placeholder="Lagos"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  name="state"
                  placeholder="Lagos"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="save-info">
               <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
               />

               <label htmlFor="saveInfo">
                 Save this information for a faster checkout next time
               </label>
              </div>
            </div>
          </div>

          <div className="order-card">
            <div className="product-row">
              <img src={productImage} alt="Corset Wedding Gown" />
              <h3>{finalState.itemName || "Corset Wedding Gown"}</h3>
              <p className="price">{formatNaira(subtotal)}</p>
            </div>

            <div className="summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">{formatNaira(subtotal)}</span>
              </div>

             <div className="summary-row">
              <span className="summary-label">Shipping</span>

              <span className="summary-value">
                {shippingCalculated
                 ? formatNaira(shipping)
                 : "Calculate after address"}
              </span>
             </div>

              <div className="summary-row total-row">
                <span className="summary-label">Total</span>


                {shippingCalculated ? (
                     <span className="total-value">
                       <small>NGN</small>
                        {formatNaira(total)}
                     </span>
                       ) : (
                 <span className="total-value">—</span>
                 )}
              </div>
            </div>

           {shippingCalculated ? (
            <button 
            onClick={finalPayment}
            >
                Complete Order
             </button>
              ) : (
                <button 
                disabled={!isAddressComplete}
                onClick={handleCalculateDelivery}>
                   Calculate Delivery
                 </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOut2;
