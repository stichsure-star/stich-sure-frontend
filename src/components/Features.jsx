import React from "react";
import "../styles/Features.css";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";

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
              <li className="fg-benefit-item">98% on-Prevent overbooking</li>
              <li className="fg-benefit-item">Maintain reputation</li>
              <li className="fg-benefit-item">Scale businesstime delivery</li>
              <li className="fg-benefit-item">Premium pricing power</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineEye /></div>
            <span className="fg-tag">Trust Quality</span>
          </div>
          <h3 className="fg-title">Real-Time Production Tracking</h3>
          <p className="fg-description">Track every stage of your order from design approval to final delivery. No more wondering when your outfit will be ready.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">6-stage tracking</li>
              <li className="fg-benefit-item">Live updates</li>
              <li className="fg-benefit-item">Designer communication</li>
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
              <li className="fg-benefit-item">Transparent pricing</li>
              <li className="fg-benefit-item">Production timelines</li>
              <li className="fg-benefit-item">Complexity ratings</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineBadgeCheck /></div>
            <span className="fg-tag">Trust Quality</span>
          </div>
          <h3 className="fg-title">KYC Verification & Secure Payments</h3>
          <p className="fg-description">All designers undergo KYC verification. Secure payment processing with escrow protection for both customers and designers.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">Verified identities</li>
              <li className="fg-benefit-item">Payment protection</li>
              <li className="fg-benefit-item">Dispute resolution</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineStar /></div>
            <span className="fg-tag">Trust & Rating</span>
          </div>
          <h3 className="fg-title">Reliability Rating System</h3>
          <p className="fg-description">Designers earn certified badges based on their on-time delivery record. Choose platinum and gold-rated designers with confidence.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">98% on-time delivery</li>
              <li className="fg-benefit-item">Verified track records</li>
              <li className="fg-benefit-item">Premium pricing power</li>
            </ul>
          </div>
        </div>

        <div className="fg-card">
          <div className="fg-card-header">
            <div className="fg-icon"><HiOutlineLightningBolt /></div>
            <span className="fg-tag">Speed</span>
          </div>
          <h3 className="fg-title">Express Fast-Track Orders</h3>
          <p className="fg-description">Need your outfit urgently? Pay premium for express delivery in 24-48 hours. Perfect for weddings, birthdays, and important events.</p>
          <div className="fg-benefits">
            <p className="fg-benefits-label">Key Benefits:</p>
            <ul className="fg-benefits-list">
              <li className="fg-benefit-item">98% on-time delivery</li>
              <li className="fg-benefit-item">Verified track records</li>
              <li className="fg-benefit-item">Premium pricing power</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}