import { LuSave } from "react-icons/lu";
import "../../../styles/designer-profile.css"

const DesignerProfile =() => {
  return (
    <main className="profile-settings-page">
      <section className="profile-settings-card">
        <h1>Profile Settings</h1>

        <form className="profile-settings-form">
          <label className="profile-field">
            <span>First Name</span>
            <input type="text" placeholder="Adebayo" />
          </label>

          <label className="profile-field">
            <span>Last Name</span>
            <input type="text" placeholder="Adebayo Styles" />
          </label>

          <label className="profile-field">
            <span>Email</span>
            <input type="email" placeholder="adebayo@example.com" />
          </label>

          <label className="profile-field">
            <span>Location</span>
            <input type="text" placeholder="Lagos, Nigeria" />
          </label>

          <label className="profile-field">
            <span>Bio</span>
            <textarea />
          </label>

          <button type="submit" className="save-profile-button">
            <LuSave />
            <span>Save Changes</span>
          </button>
        </form>
      </section>
    </main>
  );
}

export default DesignerProfile;