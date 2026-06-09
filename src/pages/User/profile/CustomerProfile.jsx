import { FiCamera } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
// import "../styles/customer-profile.css";
import "../../../styles/customer-profile.css"

const CustomerProfile = () => {
  return (
    <main className="customer-profile-page">
      <section className="customer-profile-card">
        <div className="customer-photo-section">
          <h2>Add Profile Photo</h2>

          <div className="customer-photo-upload">
            <div className="customer-photo-bg"></div>

            <button type="button" className="customer-camera-button">
              <FiCamera />
            </button>
          </div>
        </div>

        <form className="customer-profile-form">
          <h1>Profile Settings</h1>

          <label className="customer-profile-field">
            <span>First Name</span>
            <input type="text" placeholder="Josephine" />
          </label>

          <label className="customer-profile-field">
            <span>Last Name</span>
            <input type="text" placeholder="Sonayon" />
          </label>

          <label className="customer-profile-field">
            <span>Email</span>
            <input type="email" placeholder="adebayo@example.com" />
          </label>

          <button type="submit" className="customer-save-button">
            <LuSave />
            <span>Save Changes</span>
          </button>
        </form>
      </section>
    </main>
  );
};

export default CustomerProfile;