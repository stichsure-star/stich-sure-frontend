import "../../styles/Footer.css";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer_con">
      <section className="Footer_top">
        <article className="Footer_brand">
          <h1>STICHSURE</h1>

          <p>
            Africa's trusted fashion production ecosystem. Connecting customers
            with verified designers for on-time delivery.
          </p>
        </article>

        <article className="Footer_links">
          <h3>For Customers</h3>

          <ul>
            <li>Browse Designer</li>
            <li>Express Orders</li>
            <li>Track Orders</li>
            <li>How It Works</li>
          </ul>
        </article>

        <article className="Footer_links">
          <h3>For Designers</h3>

          <ul>
            <li>Join Platform</li>
            <li>Style Template</li>
            <li>Manage Orders</li>
            <li>Find Collaborators</li>
          </ul>
        </article>

        <article className="Footer_links">
          <h3>Company</h3>

          <ul>
            <li>About Us</li>
            <li>Our Mission</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </article>
      </section>

      <section className="Footer_bottom">
        <p>© 2026 FashionFlow. All rights reserved.</p>

        <div className="Footer_icons">
          <FaInstagram className="Footeric" />
          <FaTwitter className="Footeric" />
          <FaFacebook className="Footeric" />
          <FaLinkedin className="Footeric" />
        </div>
      </section>
    </div>
  );
};

export default Footer;
