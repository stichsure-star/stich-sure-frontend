import { useState } from "react";
import "../css/ActiveOrder.css";
const orders = [
  {
    id: "QJ-245608",
    time: "14/10/2026",
    customer: "Sarah",
    item: "Bridal Gown",
    value: "₦200,000",
    status: "New",
  },
  {
    id: "QJ-245609",
    time: "14/10/2026",
    customer: "John",
    item: "Bridal Gown",
    value: "₦180,000",
    status: "Preparing",
  },
  {
    id: "QJ-245610",
    time: "14/10/2026",
    customer: "Mary",
    item: "Bridal Gown",
    value: "₦220,000",
    status: "Ready",
  },
  {
    id: "QJ-245611",
    time: "14/10/2026",
    customer: "Paul",
    item: "Bridal Gown",
    value: "₦250,000",
    status: "Completed",
  },
];

const tabs = ["New", "Preparing", "Ready", "Completed"];

export default function Orders() {
  const [active, setActive] = useState("New");

  const filtered = orders.filter((o) => o.status === active);

  return (
    <div className="collab_container">
      {/* TITLE follows active tab */}
      <div className="collab_header">Active Order — {active}</div>

      {/* SEARCH */}
      <div className="collab_search">
        <input className="collab_searcher" placeholder="Search" />
      </div>

      {/* TABS */}
      <div className="collab_tabs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`collab_tab ${active === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TABLE HEADER */}
      <div className="collab_tableHeader">
        <div>Order ID</div>
        <div>Time placed</div>
        <div>Customer</div>
        <div>Item</div>
        <div>Order Value</div>
      </div>

      {/* TABLE BODY (LONG SCROLL AREA) */}
      <div className="collab_tableBody">
        {filtered.map((o) => (
          <div className="collab_row" key={o.id}>
            <div>{o.id}</div>
            <div>{o.time}</div>
            <div>{o.customer}</div>
            <div>{o.item}</div>
            <div>{o.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
