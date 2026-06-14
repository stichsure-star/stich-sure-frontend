import React from "react";
import "../styles/Features.css";
import { 
  HiOutlineUsers, 
  HiOutlineEye, 
  HiOutlineBookOpen, 
  HiOutlineBadgeCheck, 
  HiOutlineStar, 
  HiOutlineLightningBolt 
} from "react-icons/hi";

export default function FeaturesGrid() {
  return (
    <div className="fg-wrapper">
      <div className="fg-grid">

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineUsers /></div>
            <span className="fg-tag">Collaboration</span>
          </div>
          <h3 className="fg-title">Designer Collaboration Network</h3>
          <p className="fg-description">Overloaded designers can connect with trusted collaborators to share workload and maintain delivery timelines.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">Prevent overbooking</li>
              <li className="fg-benefit-item">Maintain reputation</li>
              <li className="fg-benefit-item">Scale business operations</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineEye /></div>
            <span className="fg-tag">Trust & Quality</span>
          </div>
          <h3 className="fg-title">Real-Time Production Tracking</h3>
          <p className="fg-description">Track every stage of your order from design approval to final delivery. No more wondering when your outfit will be ready.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">6-stage tracking updates</li>
              <li className="fg-benefit-item">Live push alerts</li>
              <li className="fg-benefit-item">Direct designer chat</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineBookOpen /></div>
            <span className="fg-tag">Sustainability</span>
          </div>
          <h3 className="fg-title">Standardized Style Templates</h3>
          <p className="fg-description">Browse pricing guides for common Nigerian styles. Helps designers price accurately and avoid unrealistic delivery promises.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">Transparent baseline pricing</li>
              <li className="fg-benefit-item">Predictable timelines</li>
              <li className="fg-benefit-item">Complexity scale metrics</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon alternative-icon-bg"><HiOutlineBadgeCheck /></div>
            <span className="fg-tag">Security</span>
          </div>
          <h3 className="fg-title">KYC Verification & Secure Payments</h3>
          <p className="fg-description">All designers undergo KYC verification. Secure payment processing with escrow protection for both customers and designers.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">Verified merchant identities</li>
              <li className="fg-benefit-item">Escrow payment protection</li>
              <li className="fg-benefit-item">Dedicated dispute channel</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon alternative-icon-bg"><HiOutlineStar /></div>
            <span className="fg-tag">Trust & Rating</span>
          </div>
          <h3 className="fg-title">Reliability Rating System</h3>
          <p className="fg-description">Designers earn certified badges based on their on-time delivery record. Choose platinum and gold-rated designers with confidence.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">98% on-time metric tracking</li>
              <li className="fg-benefit-item">Verified buyer reviews</li>
              <li className="fg-benefit-item">Premium tier rankings</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon alternative-icon-bg"><HiOutlineLightningBolt /></div>
            <span className="fg-tag">Speed</span>
          </div>
          <h3 className="fg-title">Express Fast-Track Orders</h3>
          <p className="fg-description">Need your outfit urgently? Pay premium for express delivery in 24-48 hours. Perfect for weddings, birthdays, and important events.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">Guaranteed 24-48hr turnaround</li>
              <li className="fg-benefit-item">Priority workflow status</li>
              <li className="fg-benefit-item">Dedicated prompt shipping</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}