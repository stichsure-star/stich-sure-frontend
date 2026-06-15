// import "./SendCollaborationRequest.css";
import { useState } from "react";
import "../css/SendCollaboration.css";
import RequestSent from "../../../popups/RequestSent";
import { useNavigate } from "react-router-dom";


const  SendCollaborationRequest =({onClose}) => {
    console.log("onClose prop =", onClose);



    const navigate =useNavigate();
    const [showRequest, setShowRequest] = useState(false);
    
  return (
    <div className="collab-request-card">
      <h2 className="collab-title">Send Collaboration Request</h2>

      <p className="collab-recipient">
        to <span>Grace Fashion Studio</span>
      </p>

      <div className="form-group">
        <label>Task Type</label>
        <input type="text" placeholder="Beading" />
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input type="text" placeholder="DD/MM/YY" />
      </div>

      <div className="form-group">
        <label>Current Address</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>Offered Payment</label>
        <input type="text" placeholder="₦10,000" />
      </div>

      <div className="form-group">
        <label>Task Details</label>
        <textarea
          rows={5}
          placeholder="Describe what you need done..."
        />
      </div>

     <div className="button-row">
 <button
  type="button"
  className="cancel-btn"
  onClick={onClose}
>
  Cancel
</button>

  <button
    type="button"
    className="submit-btn"
    onClick={() => setShowRequest(true)}
  >
    <span className="send-icon">✈</span>
    Send Request
  </button>
</div>

{showRequest && (
  <RequestSent
    onClose={() => setShowRequest(false)}
  />
)}
    </div>
  );
}

export default SendCollaborationRequest