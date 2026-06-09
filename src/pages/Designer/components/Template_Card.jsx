import React from "react";
import "../../../styles/Template_Card.css";
import { IoShirtOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Templates_Card({ template }) {
  return (
    <div className="Templates_cardContainer">
      {/* Header */}
      <div className="Templates_cardHeader">
        <div className="Templates_cardTitle">
          <IoShirtOutline className="Template_icon" />
          {template.title}
        </div>
        <div className="Templates_tagHigh">{template.complexity}</div>
      </div>

      {/* Production Info */}
      <div className="Templates_infoRow">
        <div className="Templates_infoBox">
          <p className="Templates_label">
            <MdAccessTime /> Production Time
          </p>
          <h5> {template.time}</h5>
        </div>
        <div className="Templates_infoBox">
          <p className="Templates_label">
            <MdAccessTime />
            Price Range
          </p>
          <h5> {template.price}</h5>
        </div>
      </div>
      <div className="Templates_pricing">
        <div>
          <h5>Recommended Pricing Range</h5>
          <small>
            Minimum <br />
            ₦75,000
          </small>
          <br />
          <small>Material Cost: ₦35,000 - ₦50,000</small>
        </div>
        <div>
          <small>
            Maximum <br />
            ₦100,000
          </small>
        </div>
      </div>
      <div className="Templates_mate">
        <div className="Templates_mateBox">
          <h5>Materials Required:</h5>
          <ul>
            <li>Aso-Oke fabric</li>
            <li>Embroidery thread</li>
            <li>Cap material</li>
            <li>Lining</li>
          </ul>
        </div>
        <div className="Templates_mateBox2">
          <h5>Production Stages (7):</h5>
          <ul>
            <li>
              {" "}
              <IoMdCheckmarkCircleOutline />
              <small> Measurement</small>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <small> Embroidery</small>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <small>Stitching</small>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <p> Cap Making</p>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <p>Final Assembly</p>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <small>Finishing</small>
            </li>
            <li>
              <IoMdCheckmarkCircleOutline />
              <small>Finishing</small>
            </li>
          </ul>
        </div>
      </div>

      {/* Material */}
      <div className="Templates_section"></div>

      {/* Complexity */}
      <div className="Templates_complexBox">
        <small>
          Allow extra time for embroidery work. Consider outsourcing cap-making
          to save 4-6 hours.
        </small>
        <br />
        <small>Pro Tip</small>
      </div>
      <div className="Templates_complexBox">
        <small>Complex Areas</small>
        <br />
        <small>
          Intricate embroidery, Multiple pieces, Precise measurements
        </small>
      </div>
    </div>
  );
}

export default Templates_Card;
