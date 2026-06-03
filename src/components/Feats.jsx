import { useRef } from "react";
import "../styles/Feats.css";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const designers = [
  {
    id: 1,
    name: "Glory Okafor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    specialty: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "3,097 Reviews",
    reliability: "86%",
  },
  {
    id: 2,
    name: "Daniel Mensah",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    specialty: "Luxury Fashion",
    location: "Abuja, Nigeria",
    reviews: "2,547 Reviews",
    reliability: "91%",
  },
  {
    id: 3,
    name: "Amaka Johnson",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    specialty: "Traditional Wear",
    location: "Port Harcourt",
    reviews: "4,120 Reviews",
    reliability: "88%",
  },
];

function FeaturedDesigners() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -390,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 390,
      behavior: "smooth",
    });
  };

  return (
    <section className="featured-designers">
      <div className="headong">
        <h1>Featured Designers</h1>

        <p className="subtitle">
          Verified professionals ready to bring your fashion vision to life
        </p>
      </div>

      <div className="Feat_cards" ref={sliderRef}>
        {designers.map((designer) => (
          <div className="Feat_card" key={designer.id}>
            <div className="top">
              <img
                src={designer.image}
                alt={designer.name}
                className="avatar"
              />

              <span className="verified">✓ Verified</span>
            </div>

            <h3>{designer.name}</h3>

            <p className="specialty">{designer.specialty}</p>

            <p className="info">📍 {designer.location}</p>

            <p className="info">⭐ {designer.reviews}</p>

            <div className="bottom-section">
              <div className="score">
                <span>Reliability Score</span>
                <span>{designer.reliability}</span>
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: designer.reliability }}
                ></div>
              </div>

              <p className="delivery">On-Time Deliveries</p>

              <button className="profile-btn">View Profile</button>
            </div>
            {/* Mobile Carousel Buttons */}
          </div>
        ))}
      </div>
      <div className="mobile-controls">
        <button onClick={scrollLeft}>
          <GoChevronLeft />
        </button>
        <button onClick={scrollRight}>
          <GoChevronRight />
        </button>
      </div>
    </section>
  );
}

export default FeaturedDesigners;
