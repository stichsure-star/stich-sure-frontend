import { LuSave } from "react-icons/lu";
import { FiCamera } from "react-icons/fi";
import "../../../styles/designer-profile.css"

const DesignerProfile =() => {
  return (
    <main className="profile-settings-page">
      <section className="profile-settings-card">
        <div className="designer-photo-section">
           <h1>Add Profile Photo</h1>
            <div className="designer-photo-upload">
              <div className="designer-photo-bg"></div>
           
                <button type="button" className="designer-camera-button">
                  <FiCamera />
                   </button>
              </div>
            </div>
       

        <form className="profile-settings-form">
           <h1>Profile Settings</h1>

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