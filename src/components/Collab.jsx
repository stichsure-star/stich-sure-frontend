import React, { useState } from "react";

import "../pages/Designer/css/Collaborator.css";
import FindCollaborators from "../pages/Designer/components/FindCollaborators";
import IncomingCollab from "../pages/Designer/components/IncomingCollab";
import MyCollab from "../pages/Designer/components/MyCollab";

const Collab = () => {
  const [activeTab, setActiveTab] = useState("find");

  return (
    <main className="Outsource_page">
      <section className="Outsource_header">
        <h2>Outsource & Collaborate</h2>

        <p>
          Discover skilled designers to complete your projects and grow your
          fashion business.
        </p>
      </section>

      <section className="Stats_container">
        <div className="Stat_card">
          <h3>12</h3>
          <p>Designers</p>
        </div>

        <div className="Stat_card">
          <h3>8</h3>
          <p>Projects</p>
        </div>

        <div className="Stat_card">
          <h3>5</h3>
          <p>Completed</p>
        </div>

        <div className="Stat_card">
          <h3>3</h3>
          <p>Active</p>
        </div>
      </section>

      <div className="Filter_container">
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

      {activeTab === "find" && <FindCollaborators />}

      {activeTab === "incoming" && <IncomingCollab />}

      {activeTab === "mine" && <MyCollab />}
    </main>
  );
};

export default Collab;
