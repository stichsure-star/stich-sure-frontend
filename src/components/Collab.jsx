import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../pages/Designer/css/Collaborator.css";
import FindCollaborators from "../pages/Designer/components/FindCollaborators";
import IncomingCollab from "../pages/Designer/components/IncomingCollab";
import MyCollab from "../pages/Designer/components/MyCollab";
import { useSelector } from "react-redux";
import { GoPeople } from "react-icons/go";

const Collab = () => {
  const [activeTab, setActiveTab] = useState("find");
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  return (
    <main className="Outsource_page">
      {/* HEADER */}
      <section className="Outsource_header">
        <h2>
          {" "}
          <GoPeople />
          Outsource & Collaborate
        </h2>
        <p>
          Discover skilled designers to complete your projects and grow your
          fashion business.
        </p>
      </section>

      {/* STATS */}
      <section className="Stats_container">
        <div className="Stat_card">
          <h3>{user.profile.ratingCount}</h3>
          <p>Active Collaborator</p>
        </div>
        <div className="Stat_card">
          <h3>{user.profile.ratingCount}</h3>
          <p>Trusted Partners</p>
        </div>
        <div className="Stat_card">
          <h3>{user.profile.ratingCount}</h3>
          <p>Task Completed</p>
        </div>
        <div className="Stat_card">
          <h3>{user.profile.ratingCount}</h3>
          <p>Success Rate</p>
        </div>
      </section>

      {/* FILTER + SEARCH (FIXED LAYOUT) */}
      <div className="Filter_container">
        {/* TABS ROW */}
        <div className="Filter_tabs">
          <button
            className={activeTab === "find" ? "active" : ""}
            onClick={() => setActiveTab("find")}
          >
            Find Collaborator
          </button>

          <button
            className={activeTab === "incoming" ? "active" : ""}
            onClick={() => setActiveTab("incoming")}
          >
            Incoming Collab
          </button>

          <button
            className={activeTab === "mine" ? "active" : ""}
            onClick={() => setActiveTab("mine")}
          >
            My Collab
          </button>
        </div>

        {/* SEARCH ROW */}
        <div className="Filter_search">
          <div className="Filter_search_icon">
            <CiSearch className="Hite" />
            <input
              type="text"
              placeholder="Search by specialty, skill, or location......"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === "find" && <MyCollab />}
      {activeTab === "incoming" && <IncomingCollab />}
      {activeTab === "mine" && <FindCollaborators />}
    </main>
  );
};

export default Collab;
