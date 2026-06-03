import React, { useRef } from "react";
import "../styles/Ratings.css";
import red from "../assets/gbenga/red.png";
import white from "../assets/gbenga/white.png";
import cynthia from "../assets/gbenga/cynthia.png";
import man from "../assets/gbenga/man.png";
import { TiStarOutline } from "react-icons/ti";

const Ratings = () => {
  const testimonials = [
    {
      id: 1,
      name: "Cynthia Chidera",
      role: "Bride",
      location: "Lagos, Nigeria",
      rating: 4,
      image: cynthia,
      review:
        "As a busy executive, I needed a last-minute outfit for an important meeting. The express order feature saved me! I paid the premium, and my custom suit was ready in 48 hours. Quality was excellent, and my designer kept me updated every step of the way.",
      designer: "Alaere Okonkwo",
      event: "Wedding-May 2026",
    },

    {
      id: 2,
      name: "Blessing Okonkwo",
      role: "Bride",
      location: "Lagos, Nigeria",
      rating: 4,
      image: white,
      review:
        "I found my dream wedding dress designer through Stitchout! The real-time tracking gave me peace of mind, and my dress was delivered 2 days early. The reliability rating system helped me choose a designer I could trust for my big day.",
      designer: "Alaere Okonkwo",
      event: "Wedding-May 2026",
    },

    {
      id: 3,
      name: "Chibuzor Okoro",
      role: "Birthday Celebrant",
      location: "Lagos, Nigeria",
      rating: 4,
      image: man,
      review:
        "Planning a wedding is stressful enough without worrying about late deliveries. Stitchout certified timely designers are the real deal. My agbada was delivered early, giving me time for final adjustments. Highly recommended!",
      designer: "Kola Bakare",
      event: "Wedding-May 2026",
    },
  ];

  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="Ratings_container">
      <section className="Ratings_wrapper">
        <h1>What Our Customers Say</h1>

        <p className="Ratings_text">
          Real experiences from customers who chose reliability over uncertainty
        </p>
      </section>

      <section className="Ratings_cards">
        <div className="Ratings_card">
          {testimonials.map((testimonial) => (
            <div className="Ratings_testimonial" key={testimonial.id}>
              <div className="Ratings_profile">
                <div className="Ratings_info">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="Ratings_imaged"
                  />

                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                    <p>{testimonial.location}</p>
                  </div>
                </div>

                <div>
                  <button className="Ratings_but">
                    <TiStarOutline />
                  </button>
                  <button className="Ratings_but">
                    <TiStarOutline />
                  </button>
                  <button className="Ratings_but">
                    <TiStarOutline />
                  </button>
                  <button className="Ratings_but">
                    <TiStarOutline />
                  </button>
                  <button className="Ratings_but">
                    <TiStarOutline />
                  </button>
                </div>
              </div>

              <p className="Ratings_review">"{testimonial.review}"</p>

              <div className="Ratings_details">
                <p className="Ratings_designer">
                  Designer: {testimonial.designer}
                </p>

                <p className="Ratings_event">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="Ratings_image">
          <img
            src={red}
            alt="Customer Reviews"
            className="Ratings_side_image"
          />
        </div>
      </section>
      <section className="Ratings_mobile">
        <div className="Ratings_slider" ref={sliderRef}>
          {testimonials.map((testimonial) => (
            <div className="Ratings_slide" key={testimonial.id}>
              <div className="Ratings_testimonial">
                <div className="Ratings_profile">
                  <div className="Ratings_info">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="Ratings_imaged"
                    />

                    <div>
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.role}</p>
                      <p>{testimonial.location}</p>
                    </div>
                  </div>

                  <div>
                    <button className="Ratings_but">
                      <TiStarOutline />
                    </button>
                    <button className="Ratings_but">
                      <TiStarOutline />
                    </button>
                    <button className="Ratings_but">
                      <TiStarOutline />
                    </button>
                    <button className="Ratings_but">
                      <TiStarOutline />
                    </button>
                    <button className="Ratings_but">
                      <TiStarOutline />
                    </button>
                  </div>
                </div>

                <p className="Ratings_review">"{testimonial.review}"</p>

                <div className="Ratings_details">
                  <p className="Ratings_designer">
                    Designer: {testimonial.designer}
                  </p>

                  <p className="Ratings_event">{testimonial.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="Ratings_controls">
          <button onClick={prevSlide}>❮</button>
          <button onClick={nextSlide}>❯</button>
        </div>
      </section>
    </div>
  );
};

export default Ratings;
