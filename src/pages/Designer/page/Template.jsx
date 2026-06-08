import React, { useState } from "react";
import "../../../styles/Templates.css";
import Templates_Card from "../components/Template_Card";

const Templates_data = [
  {
    id: 1,
    category: "Traditional",
    title: " Traditional Agbada (Full Set)",
    time: "5–7 days",
    price: "₦85,000",
    material: "5 yards of fabric",
    complexity: "High",
  },
  {
    id: 2,
    category: "Bridal",
    title: "Bridal Gown",
    time: "10–14 hours",
    price: "₦90,000",
    material: "6–8 yards of lace or satin",
    complexity: "Very High",
  },
  {
    id: 3,
    category: "Corporate",
    title: "Corporate Suit",
    time: "3–5 days",
    price: "₦60,000",
    material: "3 yards of suiting fabric",
    complexity: "Medium",
  },
  {
    id: 4,
    category: "Casual",
    title: "Casual Wear",
    time: "2–4 days",
    price: "₦30,000",
    material: "2–3 yards of cotton or Ankara",
    complexity: "Low",
  },
];

function Templates_App() {
  const [Templates_search, setTemplates_search] = useState("");
  const [Templates_activeCategory, setTemplates_activeCategory] =
    useState("All");

  const Templates_filtered = Templates_data.filter((t) => {
    const matchesCategory =
      Templates_activeCategory === "All" ||
      t.category === Templates_activeCategory;
    const matchesSearch = t.title
      .toLowerCase()
      .includes(Templates_search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="Templates_container">
      <header className="Templates_header">
        <h1>Pre-Built Style Templates</h1>
        <p>
          Access standardized pricing, production timelines, and complexity
          guides for common Nigerian fashion styles.
        </p>
        <div className="Templates_stats">
          <div className="Templates_stat">
            25+ <br /> Style Templates
          </div>
          <div className="Templates_stat">
            100% <br /> Accurate Pricing
          </div>
          <div className="Templates_stat">
            Save <br /> 24hrs Per Quotation
          </div>
        </div>
      </header>

      <div className="Templates_searchBar">
        <input
          type="text"
          placeholder="Search style templates..."
          value={Templates_search}
          onChange={(e) => setTemplates_search(e.target.value)}
        />
      </div>

      <div className="Templates_buttons">
        {["All", "Traditional", "Bridal", "Corporate", "Casual"].map((cat) => (
          <button
            key={cat}
            className={
              Templates_activeCategory === cat ? "Templates_active" : ""
            }
            onClick={() => setTemplates_activeCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="Templates_cards">
        {Templates_filtered.map((t) => (
          <Templates_Card key={t.id} template={t} />
        ))}
      </div>
    </div>
  );
}

export default Templates_App;
